import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { AppLayoutOverviewComponent } from './container/overview/overview.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavItemComponent } from './components/sidebar/nav-item/nav-item.component';

@NgModule({
  declarations: [AppLayoutOverviewComponent, HeaderComponent, SidebarComponent, NavItemComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AppLayoutModule { }
