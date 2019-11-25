import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchitectureRoutingModule } from './architecture-routing.module';
import { ArchitectListComponent } from './containers/architect-list/architect-list.component';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [ArchitectListComponent],
  imports: [
    CommonModule,
    ArchitectureRoutingModule,
    SharedModule
  ]
})
export class ArchitectureModule { }
