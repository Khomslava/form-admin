
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslateModule } from '@ngx-translate/core';

// Modules
import { MaterialModule } from './modules/material.module';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const COMPONENTS = [ConfirmDialogComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,

    TranslateModule,

    MaterialModule,
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,

    TranslateModule,

    MaterialModule,
  ]
})
export class SharedModule { }
