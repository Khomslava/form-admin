import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ProjectService } from './../../../core/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: any;
  displayedColumns: string[] = ['image', 'name', 'categories', 'order', 'year', 'square' ];
  dataSource: MatTableDataSource<any[]>;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
     this.projectService.getProjects().subscribe( projects => {
       console.log(projects);
       this.dataSource = new MatTableDataSource(projects);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
