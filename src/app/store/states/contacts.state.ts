import { IContacts } from './../../core/models';

export interface IContactsState {
    contacts: IContacts[];
}

export const initialContactsState: IContactsState = {
    contacts: null
};
