import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { finalize, catchError, map, first, debounceTime, distinctUntilChanged, takeWhile, switchMap, tap, filter } from 'rxjs/operators';
import * as _ from 'lodash';

import { Upload } from './../../../core/models/upload.model';
import { UploadService } from './../../../core/services/upload.service';
import { ProjectService } from './../../../core/services/project.service';
import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';

enum eOrder {
  'architect' = 1,
  'interior' = 2,
  'product' = 3
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  projectId: string;
  project: any;
  images: any[];
  upload: Upload;
  parentUrl: string;
  parentUrlName: string;
  private componentDestroyed = false;
  formValuesChanged = false;
  projectForm = this.fb.group({
    showInMainPages: [false],
    square: [''],
    year: [''],
    photosLarge: [[]],
    factoryWebLink: [''],
    categories: [[], Validators.required],
    translate: this.fb.array([this.createProjectTranslate(), this.createProjectTranslate(), this.createProjectTranslate()])
  });

  categoriesList = [
    { id: 'architect', title: 'project.architect' },
    { id: 'interior', title: 'project.interior' },
    { id: 'product', title: 'project.product'}];
  languagesList = [{ id: 1, title: 'general.english' }, { id: 2, title: 'general.russian' }, { id: 1, title: 'general.spanish' }];

  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private detectionRef: ChangeDetectorRef,
    private projectService: ProjectService,
    private uploadService: UploadService
  ) {
    this.projectId = this.route.snapshot.params.id;
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
         const urlArr = e['url'].split('/');
         urlArr.pop();
         this.parentUrlName = `project.${urlArr[urlArr.length - 1]}`;
         this.parentUrl = urlArr.join('/');
      });
  }

  ngOnInit() {
    if (this.projectId && this.projectId !== 'new') {
      this.getProject();
    }
    this.formValueChanges();
  }

  ngOnDestroy() {
    this.componentDestroyed = true;
  }

  hasError = (control, errorName: string) => {
    return control.hasError(errorName);
  }


  onSubmit() {
    if (this.projectForm.invalid) {
      return false;
    }

    if (this.projectId && this.projectId === 'new') {
      this.createProject();
    } else {
      this.updateProject();
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if ((this.projectForm.dirty || this.formValuesChanged) && this.projectForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          content: {
            title: 'general.save_changes',
            text: 'general.want_save_changes_before_leaving',
            cancel: 'general.dont_save',
            confirm: 'general.save'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map((result) => {
          if (result === undefined) {
            return false;
          }

          if (result) {
            this.onSubmit();
          }

          return true;
        }),
        first()
      );
    }
    return true;
  }

  deleteProject() {
    if (this.projectId === 'new') {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        content: {
          title: 'project.delete_project',
          text: 'project.if_you_delete_project_all',
          cancel: 'general.cancel',
          confirm: 'general.delete'
        }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.projectService
          .deleteProject(this.project.id)
          .pipe(
            catchError((err) => {
              this.openSnackBar(this.translateService.instant('project.project_didnt_deleted'));
              return throwError(err);
            }
          ))
          .subscribe(() => {
            this.projectForm.reset();
            this.formValuesChanged = false;
            this.openSnackBar(this.translateService.instant('project.project_was_deleted'));
            this.router.navigate([this.parentUrl]);
          });
      }
    });
  }

  uploadedImages(images) {
    this.images = images;
  }

  createProjectTranslate(project?: any): FormGroup {
    return this.fb.group({
      name: [project && project.name ? project.name : '', Validators.required],
      authors: [project && project.authors ? project.authors : ''],
      city: [project && project.city ? project.city : ''],
      country: [project && project.country ? project.country : ''],
      description: [project && project.description ? project.description : ''],
      photographers: [project && project.photographers ? project.photographers : []],
      factory: [project && project.factory ? project.factory : ''],
    });
  }

  getLanguageName(index: number): string {
    return this.languagesList[index].title;
  }

  private createProject() {
    const project = this.createProjectPayload();
    this.projectService
      .createProject(project)
      .pipe(
        catchError((err) => {
          this.openSnackBar(this.translateService.instant('project.project_didnt_created'));
          return throwError(err);
        }
      ))
      .subscribe( result => {
        project.id = result.body['name'];
        this.projectService.updateProject(project.id, project);
        const idFirebaseProduct = project.id;

        if (this.images) {
          const imageToUpload = this.images;
          const imagesIdx = _.range(imageToUpload.length);
          _.each(imagesIdx, (idx) => {
            this.upload = new Upload(imageToUpload[idx]);
            this.upload['order'] = idx;
            this.upload['showOnMainPage'] = this.images[idx]['showOnMainPage'];
            this.uploadService.uploadFile(this.upload, idFirebaseProduct, 'photosLarge');
          });
        }
        this.projectForm.reset();
        this.formValuesChanged = false;
        this.openSnackBar(this.translateService.instant('project.project_was_created'));
        this.router.navigate([this.parentUrl]);
      });
  }

  private updateProject() {
    const payload = this.createProjectPayload();
    this.projectService
    .updateProject(this.project.id, payload)
    .pipe(
      catchError((err) => {
        this.openSnackBar(this.translateService.instant('project.project_didnt_updated'));
        return throwError(err);
      }
    ))
    .subscribe(() => {
      this.projectForm.reset();
      this.formValuesChanged = false;
      this.openSnackBar(this.translateService.instant('project.project_was_updated'));
      this.router.navigate([this.parentUrl]);
    });
  }

  private getProject() {
    this.projectService
      .getProjectById(this.projectId)
      .subscribe(project => {
        this.project = project;
        this.patchProjectFormValues(project);
        this.formValuesChanged = false;
      });
  }

  get translate(): FormArray {
    return this.projectForm.get('translate') as FormArray;
  }

  private formValueChanges() {
    this.projectForm
      .valueChanges
      .pipe(
        takeWhile(() => !this.componentDestroyed)
      )
      .subscribe(() => {
        this.formValuesChanged = true;
        this.detectionRef.markForCheck();
      });
  }

  private patchProjectFormValues(project) {
    this.projectForm.patchValue({
      showInMainPages: project.showInMainPages,
      square: project.square,
      year: project.year,
      factoryWebLink: project.factoryWebLink,
      categories: project.categoryId,
      photosLarge: project.photosLarge
    });
    this.translate.patchValue([project.translate[0], project.translate[1], project.translate[2]]);
  }

  private createProjectPayload() {
    const {
      showInMainPages,
      square,
      year,
      photosLarge,
      factoryWebLink,
      categories,
      translate
    } = this.projectForm.value;

    return {
      showInMainPages,
      square: +square,
      year: +year,
      photosLarge,
      factoryWebLink,
      // link: factoryWebLink ? factoryWebLink : '',
      categoryId: categories, // TODO: need to change name of property in all app
      translate,
      // order: this.project && this.project.order ? this.project.order : 0,
      name: this.getName(translate),
      factory: translate && translate[0] && translate[0].factory ? translate[0].factory : '', // TODO: need remove for all page
      id: this.project && this.project.id ? this.project.id : '', // TODO: need remove for all page
      orders: this.project && this.project.orders ? this.project.orders : this.getOrders(categories)
    };
  }

  private getOrders(categories): any {
    return { architect: 0, interior: 0, product: 0};
  }

  private getName(translate): string {
    if (translate && translate.length && translate[0].name) {
      return translate[0].name.trim().toLowerCase().split(' ').join('-');
    }
    return '';
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

}
