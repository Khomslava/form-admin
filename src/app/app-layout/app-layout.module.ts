import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutOverviewComponent } from './container/overview/overview.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  declarations: [AppLayoutOverviewComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AppLayoutModule { }
