import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatIconModule,
  MatCheckboxModule,
  MatSortModule,
  MatSnackBarModule,
  MatSelectModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatTooltipModule,
} from '@angular/material';

const MODULES = [
  // Navigation
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,

  // Loyout

  // Buttons & Indicators
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,

  // Form controls
  MatCheckboxModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,

  // Table
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,

  // Popaps $ Modals
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [
    MODULES
  ],
  exports: [
    MODULES
  ]
})
export class MaterialModule { }
