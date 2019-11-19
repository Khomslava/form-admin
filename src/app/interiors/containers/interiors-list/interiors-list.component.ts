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
    this.projectService.getProjects().subscribe(projects => {
      console.log(projects);
      this.dataSource = new MatTableDataSource(projects);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
