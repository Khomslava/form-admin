
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './containers/projects-list/projects-list.component';
import { ProjectComponent } from './containers/project/project.component';

@NgModule({
  declarations: [ProjectsListComponent, ProjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
