import { RouterReducerState } from '@ngrx/router-store';

import { IProjectState, initialProjectState } from './project.state';
import { IAwardsState, initialAwardsState } from './awards.state';

export interface IAppState {
  router?: RouterReducerState;
  projects: IProjectState;
  awards: IAwardsState;
}

export const initialAppState: IAppState = {
  projects: initialProjectState,
  awards: initialAwardsState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
