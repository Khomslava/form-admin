import { filter, map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { ProjectService } from './../../../core/services/project.service';

import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  projects = [];
  displayedColumns: string[] = ['order', 'image', 'name', 'factory', 'year', 'actions'];
  dataSource: MatTableDataSource<any[]>;

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects()
      .pipe(map((projects: any[]) => {
        if (projects && projects.length) {
          projects = projects.filter(project => project.categoryId.some(category => category === 'product'));
          projects = this.sortByOrder(projects);
          projects = this.setProjectsOrders(projects);
        }
        return projects;
      }))
      .subscribe(projects => {
        this.projects = projects;
        this.dataSource = new MatTableDataSource(projects);
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
          text: 'project.if_you_delete_project',
          cancel: 'general.cancel',
          confirm: 'general.delete'
        }
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && project.categoryId && project.categoryId.length) {
        if (project.categoryId.length === 1) {
          this.projectService.deleteProject(project.id);
          this.projects.splice(index, 1);
        } else {
          this.projects[index].categoryId = this.projects[index].categoryId.filter(category => category !== 'product');
          this.projectService.updateProject(project.id, this.projects[index]);
          this.projects = this.projects.filter(proj => proj.categoryId.some(category => category === 'product'));
        }

        this.projects = this.setProjectsOrders(this.projects);
        this.dataSource = new MatTableDataSource(this.projects);
        this.saveAllProjects();
      }
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
      this.projectService.updateProject(this.projects[index].id, this.projects[index]);
      this.projectService.updateProject(this.projects[index - 1].id, this.projects[index - 1]);
      this.projects = this.sortByOrder(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
    }
  }

  moveProjectDown(index: number, event: Event) {
    event.stopPropagation();
    if (this.projects[index + 1]) {
      this.projects[index].orders.product = index + 1;
      this.projects[index + 1].orders.product = index;
      this.projectService.updateProject(this.projects[index].id, this.projects[index]);
      this.projectService.updateProject(this.projects[index + 1].id, this.projects[index + 1]);
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
    this.projects.forEach(project => this.projectService.updateProject(project.id, project));
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
      } else {
        project.orders = { product: i };
      }
    });
    return projects;
  }

}
