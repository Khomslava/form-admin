
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { finalize, catchError, map, first, debounceTime, distinctUntilChanged, takeWhile, switchMap, tap } from 'rxjs/operators';

import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  projectId;
  private componentDestroyed = false;
  formValuesChanged = false;
  projectForm = this.fb.group({
    showInMainPages: [''],
    square: [''],
    year: [''],
    link: [''],
    factoryWebLink: [[]],
    categories: [''],
    translations: ['']
  });

  categoriesList = [{id: 1, title: 'project.architect'}, {id: 2, title: 'project.interior'}, {id: 3, title: 'project.product'}];

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private detectionRef: ChangeDetectorRef
  ) {
    this.projectId = this.route.snapshot.params.id;
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

  hasError = (controlName: string, errorName: string) => {
    return this.projectForm.get(controlName).hasError(errorName);
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return false;
    }

    if (this.projectId && this.projectId === 'new') {
      this.createNewProject();
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
    
  }

  private createNewProject() {
  }

  private updateProject() {
  }

  private getProject() {
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
      // name: brand.name,
      // logoUrl: brand.logoUrl,
      // serialLocationImageUrl: brand.serialLocationImageUrl,
      // websiteUrl: brand.websiteUrl,
      // discountPercentage: brand.discountPercentage,
      // retailers: this.listToString(brand.retailers, 'name'),
      // creationDate: this.datePipe.transform(brand.creationDate, 'dd-MM-yyyy'),
      // status: brand.statusDescription,
      // description: brand.description,
      // termsAndConditions: brand.termsAndConditions,
      // balanceCheckInstructions: brand.balanceCheckInstructions,
      // sourceId: brand.source === this.brandSource.gcn ? this.sourceIdDescription.gcn : this.sourceIdDescription.cardProvide
    });
  }

  private createProjectPayload() {
    const {
      // serialLocationImageUrl,
      // websiteUrl,
      // balanceCheckInstructions,
      // description,
      // termsAndConditions
    } = this.projectForm.value;

    return {
      // name: this.brandForm.get('name').value,
      // balanceCheckInstructions,
      // description,
      // termsAndConditions,
      // logoUrl: this.brandForm.get('logoUrl').value,
      // serialLocationImageUrl,
      // websiteUrl
    };
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

}
