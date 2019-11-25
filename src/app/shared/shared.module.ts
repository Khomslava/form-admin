import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslateModule } from '@ngx-translate/core';
import { DndModule } from 'ngx-drag-drop';
import { QuillModule } from 'ngx-quill';

// Modules
import { MaterialModule } from './modules/material.module';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ProjectComponent } from './components/project/project.component';

const COMPONENTS = [ConfirmDialogComponent, UploadImagesComponent, ProjectComponent];

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
    DndModule,
    QuillModule,

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
    DndModule,

    TranslateModule,

    MaterialModule,
    UploadImagesComponent,
    ProjectComponent
  ]
})
export class SharedModule { }
