
import { RouterReducerState } from '@ngrx/router-store';

import { IProjectState, initialProjectState } from './project.state';
import { IContactsState, initialContactsState } from './contacts.state';

export interface IAppState {
  router?: RouterReducerState;
  projects: IProjectState;
  contacts: IContactsState;
}

export const initialAppState: IAppState = {
  projects: initialProjectState,
  contacts: initialContactsState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
