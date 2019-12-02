import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from '../states/app.state';
import { projectReducers } from './project.reducers';
import { contactsReducers } from './contacts.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  projects: projectReducers,
  contacts: contactsReducers
};
