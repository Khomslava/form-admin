import { filter, map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { ProjectService } from './../../../core/services/project.service';

import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-interiors-list',
  templateUrl: './interiors-list.component.html',
  styleUrls: ['./interiors-list.component.scss']
})
export class InteriorsListComponent implements OnInit {

  projects = [];
  displayedColumns: string[] = ['order', 'image', 'name', 'square', 'year', 'actions'];
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
          projects = projects.filter(project => project.categoryId.some( category => category === 2));
          projects = this.sortByOrder(projects);
          projects = this.setProjectsOrders(projects);
        }
        return projects;
      }))
      .subscribe(projects => {
      console.log(projects);
      this.projects = projects;
      this.dataSource = new MatTableDataSource(projects);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmDeleteProject(index: number, event: Event) {
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
      if (res) {
        this.projects.splice(index, 1);
        this.projects = this.setProjectsOrders(this.projects);
        this.dataSource = new MatTableDataSource(this.projects);
      }
    });
  }

  createProject() {
    this.router.navigate(['/interiors/new']);
  }

  goToProject(project) {
    this.router.navigate([`/interiors/${project.id}`]);
  }

  moveProjectUp(index: number, event: Event) {
    event.stopPropagation();
    if (this.projects[index - 1]) {
      this.projects[index].orders['2'] = index - 1;
      this.projects[index - 1].orders['2'] = index;
      this.sortByOrder(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
      this.saveProjects();
    }
  }

  moveProjectDown(index: number, event: Event) {
    event.stopPropagation();
    if (this.projects[index + 1]) {
      this.projects[index].orders['2'] = index + 1;
      this.projects[index + 1].orders['2'] = index;
      this.sortByOrder(this.projects);
      this.dataSource = new MatTableDataSource(this.projects);
      this.saveProjects();
    }
  }

  getLogoUrl(project): string {
    const ph = project.photosLarge;
    for (const key in project.photosLarge) {
      if (project.photosLarge[key].order === 1) {
        return project.photosLarge[key].url;
      }
    }
    return undefined;
  }

  private saveProjects() {

  }

  private sortByOrder(projects): any[] {
    return projects.sort((a, b) => {
      if (a.orders && a.orders['2'] && b.orders && b.orders['2']) {
        return a.orders['2'] - b.orders['2'];
      }
      return a.order - b.order;
    });
  }

  private setProjectsOrders(projects): any[] {
    projects.forEach( (project, i) => {
      if (project.orders) {
        project.orders['2'] = i;
      } else {
        project.orders = {'2': i};
      }
    });
    return projects;
  }

}
