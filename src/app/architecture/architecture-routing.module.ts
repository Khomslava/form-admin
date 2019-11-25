import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './../core/services/guards/can-deactivate.guard';

import { ArchitectListComponent } from './containers/architect-list/architect-list.component';
import { ProjectComponent } from 'src/app/shared/components/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ArchitectListComponent
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
export class ArchitectureRoutingModule { }
