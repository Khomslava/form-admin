import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './containers/projects-list/projects-list.component';
import { ProjectComponent } from './containers/project/project.component';

@NgModule({
  declarations: [ProjectsListComponent, ProjectComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
