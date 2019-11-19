import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { ERoutingPath } from './shared/models/routing.models';
import { AuthGuard } from './core/services/guards/auth.guard';
import { AppLayoutOverviewComponent } from './app-layout/container/overview/overview.component';

const routes: Routes = [
  // {
  //   path: ERoutingPath.PAGE_NOT_FOUND,
  //   loadChildren: () => import('./errors/error.module').then(m => m.ErrorModule)
  // }
  {
    path: ERoutingPath.LOGIN,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: AppLayoutOverviewComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: ERoutingPath.DEFAULT,
        pathMatch: 'full'
      },
      {
        path: ERoutingPath.INTERIORS,
        loadChildren: () => import('./interiors/interiors.module').then(m => m.InteriorsModule)
      },
      {
        path: ERoutingPath.ARCHITECTURE,
        loadChildren: () => import('./architecture/architecture.module').then(m => m.ArchitectureModule)
      },
      {
        path: ERoutingPath.PRODUCTS,
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: ERoutingPath.CONTACTS,
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
      },
      {
        path: ERoutingPath.ABOUT,
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
