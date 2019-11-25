import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './../core/services/guards/can-deactivate.guard';

import { InteriorsListComponent } from './containers/interiors-list/interiors-list.component';
import { ProjectComponent } from 'src/app/shared/components/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: InteriorsListComponent
  },
  {
    path: ':id',
    component: ProjectComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteriorsRoutingModule { }
