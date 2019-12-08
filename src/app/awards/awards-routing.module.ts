import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwardsListComponent } from './containers/awards-list/awards-list.component';

const routes: Routes = [
  {
    path: '',
    component: AwardsListComponent
  },
  // {
  //   path: ':id',
  //   component: AwardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardsRoutingModule { }
