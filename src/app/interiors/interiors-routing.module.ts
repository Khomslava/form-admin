import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './containers/project/project.component';
import { InteriorsListComponent } from './containers/interiors-list/interiors-list.component';

const routes: Routes = [
  {
    path: '',
    component: InteriorsListComponent
  },
  {
    path: ':id',
    component: ProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteriorsRoutingModule { }
