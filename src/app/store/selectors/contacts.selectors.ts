import { createSelector } from '@ngrx/store';

import { IContactsState } from './../states/contacts.state';
import { IAppState } from '../states/app.state';


const selectContacts = (state: IAppState) => state.contacts;

export const selectContactsList = createSelector(
    selectContacts,
    (state: IContactsState) => state.contacts
);
