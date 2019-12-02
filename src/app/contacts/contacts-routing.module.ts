import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './../core/services/guards/can-deactivate.guard';
import { ContactsComponent } from './containers/contacts/contacts.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
