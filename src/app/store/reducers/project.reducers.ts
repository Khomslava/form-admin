import { createReducer, on } from '@ngrx/store';

import { ProjectActions, EProjectActions } from './../actions/project.action';
import { initialProjectState, IProjectState } from './../states/project.state';


export const projectReducers = (
  state = initialProjectState,
  action: ProjectActions
): IProjectState => {
  switch (action.type) {
    case EProjectActions.GetProjectsSuccess: {
      return {
        ...state,
        projects: action.payload
      };
    }
    case EProjectActions.GetProjectSuccess: {
      return {
        ...state,
        selectedProject: action.payload
      };
    }
    default:
      return state;
  }
};
