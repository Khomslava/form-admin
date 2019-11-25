
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { InteriorsRoutingModule } from './interiors-routing.module';
import { InteriorsListComponent } from './containers/interiors-list/interiors-list.component';

@NgModule({
  declarations: [InteriorsListComponent],
  imports: [
    CommonModule,
    InteriorsRoutingModule,
    SharedModule
  ]
})
export class InteriorsModule { }
