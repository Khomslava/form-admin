import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';

import { ProjectService } from './../../../core/services/project.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { IAppState } from 'src/app/store/states/app.state';
import { GetProjects } from './../../../store/actions/project.action';
import { selectProjectsByCategory } from './../../../store/selectors/project.selectors';
import { IProject } from './../../../core/models/project.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  projects = [];
  displayedColumns: string[] = ['order', 'image', 'name', 'factory', 'year', 'actions'];
  dataSource: MatTableDataSource<IProject[]>;

  private category = 'product';

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public translateService: TranslateService,
    private router: Router,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.store.dispatch(new GetProjects());
    this.store
      .pipe(select(selectProjectsByCategory(this.category)))
      .subscribe( (projects: IProject[]) => {
        projects = this.sortByOrder(projects);
        projects = this.setProjectsOrders(projects);
        this.projects = projects;
        this.dataSource = new MatTableDataSource(this.projects);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmDeleteProject(project: any, index: number, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        content: {
          title: 'project.delete_project',
          text: 'project.if_you_delete_project_from_category',
          cancel: 'general.cancel',
          confirm: 'general.delete'
        }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && project.categoryId && project.categoryId.length) {
        if (project.categoryId.length  === 1) {
          this.deleteProject(project.id, index);
        } else {
          this.projects[index].categoryId = this.projects[index].categoryId.filter(category => category !== 'product');
          this.updateProject(project);
        }
      }
    });
  }

  private deleteProject(project, index: number) {
    this.projectService
    .deleteProject(project.id)
    .pipe(
      catchError((err) => {
        this.openSnackBar(this.translateService.instant('project.project_didnt_deleted'));
        return throwError(err);
      }
    ))
    .subscribe(() => {
      this.openSnackBar(this.translateService.instant('project.project_was_deleted'));
      this.projects.splice(index, 1);
      this.projects = this.setProjectsOrders(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
      this.saveAllProjects();
    });
  }


  private updateProject(project) {
    this.projectService
    .updateProject(project.id, project)
    .pipe(
      catchError((err) => {
        this.openSnackBar(this.translateService.instant('project.project_didnt_updated'));
        return throwError(err);
      }
    ))
    .subscribe(() => {
      this.openSnackBar(this.translateService.instant('project.project_was_updated'));
      this.projects = this.projects.filter(proj => proj.categoryId.some(category => category === 'product'));
      this.projects = this.setProjectsOrders(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
      this.saveAllProjects();
    });
  }

  createProject() {
    this.router.navigate(['/products/new']);
  }

  goToProject(project) {
    this.router.navigate([`/products/${project.id}`]);
  }

  moveProjectUp(index: number, event: Event) {
    event.stopPropagation();
    if (this.projects[index - 1]) {
      this.projects[index].orders.product = index - 1;
      this.projects[index - 1].orders.product = index;
      this.projectService.updateProjectFirebase(this.projects[index].id, this.projects[index]);
      this.projectService.updateProjectFirebase(this.projects[index - 1].id, this.projects[index - 1]);
      this.projects = this.sortByOrder(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
    }
  }

  moveProjectDown(index: number, event: Event) {
    event.stopPropagation();
    if (this.projects[index + 1]) {
      this.projects[index].orders.product = index + 1;
      this.projects[index + 1].orders.product = index;
      this.projectService.updateProjectFirebase(this.projects[index].id, this.projects[index]);
      this.projectService.updateProjectFirebase(this.projects[index + 1].id, this.projects[index + 1]);
      this.projects = this.sortByOrder(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
    }
  }

  getLogoUrl(project): string {
    const ph = project.photosLarge;
    for (const key in project.photosLarge) {
      if (project.photosLarge[key].order === 0) {
        return project.photosLarge[key].url;
      }
    }
    return undefined;
  }

  private saveAllProjects() {
    this.projects.forEach(project => this.projectService.updateProjectFirebase(project.id, project));
  }

  private sortByOrder(projects): any[] {
    return projects.sort((a, b) => {
      if (a.orders && b.orders) {
        return a.orders.product - b.orders.product;
      }
      return a.order - b.order;
    });
  }

  private setProjectsOrders(projects): any[] {
    projects.forEach((project, i) => {
      if (project.orders) {
        project.orders.product = i;
      }
    });
    return projects;
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }


}
