import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';

import { AboutComponent } from './containers/about/about.component';
import { CanDeactivateGuard } from './../core/services/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
