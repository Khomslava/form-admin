import { Action } from '@ngrx/store';

import { IContacts } from './../../core/models/contacts.model';

export enum EContactsActions {
    GetContacts = '[Contacts] Get Contacts',
    GetContactsSuccess = '[Contacts] Get Contacts Success',
    UpdateContacts = '[Contacts] Update Contacts',
    UpdateContactsSuccess = '[Contacts] Update Contacts Success'
}

export class GetContacts implements Action {
    public readonly type = EContactsActions.GetContacts;
}

export class GetContactsSuccess implements Action {
    public readonly type = EContactsActions.GetContactsSuccess;
    constructor(public payload: IContacts[]) {}
}

export class UpdateContacts implements Action {
    public readonly type = EContactsActions.UpdateContacts;
    constructor(public payload: IContacts[]) { }
}

export class UpdateContactsSuccess implements Action {
    public readonly type = EContactsActions.UpdateContactsSuccess;
    constructor(public payload: any) { }
}

export type ContactsActions =
    GetContacts |
    GetContactsSuccess |
    UpdateContacts |
    UpdateContactsSuccess;
