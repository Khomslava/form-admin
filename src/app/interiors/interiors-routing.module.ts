import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteriorsListComponent } from './containers/interiors-list/interiors-list.component';
import { ProjectComponent } from 'src/app/shared/components/project/project.component';

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
