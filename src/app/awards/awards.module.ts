

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { SharedModule } from './../shared/shared.module';
import { AwardsRoutingModule } from './awards-routing.module';
import { AwardsState } from './store/awards.state';
import { AwardsListComponent } from './containers/awards-list/awards-list.component';

@NgModule({
  declarations: [AwardsListComponent],
  imports: [
    CommonModule,
    AwardsRoutingModule,
    SharedModule,
    NgxsModule.forFeature([AwardsState]),
  ]
})
export class AwardsModule { }
