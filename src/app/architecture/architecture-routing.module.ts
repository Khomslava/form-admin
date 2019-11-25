import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchitectListComponent } from './containers/architect-list/architect-list.component';
import { ProjectComponent } from 'src/app/shared/components/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ArchitectListComponent
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
export class ArchitectureRoutingModule { }
