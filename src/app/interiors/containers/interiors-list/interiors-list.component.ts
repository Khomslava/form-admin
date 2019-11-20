import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ProjectService } from './../../../core/services/project.service';

@Component({
  selector: 'app-interiors-list',
  templateUrl: './interiors-list.component.html',
  styleUrls: ['./interiors-list.component.scss']
})
export class InteriorsListComponent implements OnInit {

  projects: any;
  displayedColumns: string[] = ['order', 'image', 'name', 'categories', 'square', 'year', 'actions'];
  dataSource: MatTableDataSource<any[]>;

  constructor(
    private projectService: ProjectService
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
      this.dataSource = new MatTableDataSource(projects);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProject(project) {

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

}
