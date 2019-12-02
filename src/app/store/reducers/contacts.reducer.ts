import { ContactsActions, EContactsActions } from './../actions/contacts.actions';
import { IContactsState, initialContactsState } from './../states/contacts.state';

export const contactsReducers = (
    state = initialContactsState,
    action: ContactsActions
): IContactsState => {
    switch (action.type) {
        case EContactsActions.GetContactsSuccess: {
            return {
                ...state,
                contacts: action.payload
            };
        }
        case EContactsActions.UpdateContactsSuccess: {
            return {
                ...state,
                contacts: action.payload
            };
        }
        default:
            return state;
    }
};
