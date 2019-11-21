
import { filter, map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

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
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects()
      .pipe(map((projects: any[]) => {
        if (projects && projects.length) {
          projects = projects.filter(project => project.categoryId.some( category => category === 2));
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
        this.dataSource = new MatTableDataSource(this.projects);
      }
    });
  }

  createProject() {

  }

  moveProjectUp(index: number, event: Event) {
    event.stopPropagation();
    if (this.projects[index - 1]) {
      const tempProject = this.projects[index];
      this.projects[index] = this.projects[index - 1];
      this.projects[index - 1] = tempProject;
      this.dataSource = new MatTableDataSource(this.projects);
      this.saveProjects();
    }
  }

  moveProjectDown(index: number, event: Event) {
    event.stopPropagation();
    if (this.projects[index + 1]) {
      const tempProject = this.projects[index];
      this.projects[index] = this.projects[index + 1];
      this.projects[index + 1] = tempProject;
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

}
