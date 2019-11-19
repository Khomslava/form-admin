import { InteriorsListComponent } from './containers/interiors-list/interiors-list.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: InteriorsListComponent
  },
  {
    path: ':id',
    component: InteriorsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteriorsRoutingModule { }
