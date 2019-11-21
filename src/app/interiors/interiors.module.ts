import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { InteriorsRoutingModule } from './interiors-routing.module';
import { InteriorsListComponent } from './containers/interiors-list/interiors-list.component';
import { ProjectComponent } from './containers/project/project.component';

@NgModule({
  declarations: [InteriorsListComponent, ProjectComponent],
  imports: [
    CommonModule,
    InteriorsRoutingModule,
    SharedModule
  ]
})
export class InteriorsModule { }
