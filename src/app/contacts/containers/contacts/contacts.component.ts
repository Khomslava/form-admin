import { IContacts } from './../../../core/models/contacts.model';
import { selectContactsList } from './../../../store/selectors/contacts.selectors';
import { GetContacts, UpdateContacts } from './../../../store/actions/contacts.actions';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { finalize, catchError, map, first, debounceTime, distinctUntilChanged, takeWhile, switchMap, tap, filter } from 'rxjs/operators';

import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { IAppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  private componentDestroyed = false;
  formValuesChanged = false;
  contactsForm = this.fb.group({
    translate: this.fb.array([this.createContactsTranslate(), this.createContactsTranslate(), this.createContactsTranslate()])
  });
  languagesList = [{ id: 1, title: 'general.english' }, { id: 2, title: 'general.russian' }, { id: 1, title: 'general.spanish' }];


  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private detectionRef: ChangeDetectorRef,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  ngOnDestroy() {
    this.componentDestroyed = true;
  }

  hasError = (control, errorName: string) => {
    return control.hasError(errorName);
  }

  onSubmit() {
    if (this.contactsForm.invalid) {
      return false;
    }

    this.store.dispatch(new UpdateContacts(this.translate.value));
  }

  createContactsTranslate(contact?: any): FormGroup {
    return this.fb.group({
      name: [contact && contact.name ? contact.name : '', Validators.required],
      country: [contact && contact.country ? contact.country : ''],
      city: [contact && contact.city ? contact.city : ''],
      street: [contact && contact.street ? contact.street : ''],
      build: [contact && contact.build ? contact.build : ''],
      index: [contact && contact.index ? contact.index : ''],
      phone: [contact && contact.phone ? contact.phone : ''],
      email: [contact && contact.email ? contact.email : '']
    });
  }

  getLanguageName(index: number): string {
    return this.languagesList[index].title;
  }

  get translate(): FormArray {
    return this.contactsForm.get('translate') as FormArray;
  }

  private formValueChanges() {
    this.contactsForm
      .valueChanges
      .pipe(
      takeWhile(() => !this.componentDestroyed)
      )
      .subscribe(() => {
        this.formValuesChanged = true;
        this.detectionRef.markForCheck();
      });
  }

  private getContacts() {
    this.store.dispatch(new GetContacts());
    this.store.pipe(select(selectContactsList))
      .subscribe((contacts: IContacts[]) => {
        if (contacts && contacts.length) {
          this.translate.patchValue([contacts[0], contacts[1], contacts[2]]);
          this.formValuesChanged = false;
        }
      });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if ((this.contactsForm.dirty || this.formValuesChanged) && this.contactsForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          content: {
            title: 'general.save_changes',
            text: 'general.want_save_changes_before_leaving',
            cancel: 'general.dont_save',
            confirm: 'general.save'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map((result) => {
          if (result === undefined) {
            return false;
          }

          if (result) {
            this.onSubmit();
          }

          return true;
        }),
        first()
      );
    }
    return true;
  }

}
