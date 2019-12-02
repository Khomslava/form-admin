
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { IAppState } from 'src/app/store/states/app.state';
import { ContactsService } from './../../core/services/contacts.service';
import { IContacts } from './../../core/models/contacts.model';
import { GetContacts, EContactsActions, GetContactsSuccess, UpdateContacts, UpdateContactsSuccess } from './../actions/contacts.actions';

@Injectable()
export class ContactsEffects {
    getContacts = createEffect(() =>
        this.actions$.pipe(
            ofType<GetContacts>(EContactsActions.GetContacts),
            switchMap(() => this.contactsService.getContacts()),
            switchMap((contacts: IContacts[]) => of(new GetContactsSuccess(contacts))),
            catchError(() => EMPTY))
    );

    updateContacts = createEffect(() =>
        this.actions$.pipe(
            ofType<UpdateContacts>(EContactsActions.UpdateContacts),
            switchMap(action => this.contactsService.updateContacts(action.payload)),
            switchMap((response) => of(new UpdateContactsSuccess(response))),
            catchError(() => EMPTY))
    );

    constructor(
        private contactsService: ContactsService,
        private actions$: Actions,
        private store: Store<IAppState>
    ) {}
}
