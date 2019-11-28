import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from '../states/app.state';
import { projectReducers } from './project.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  projects: projectReducers
};
