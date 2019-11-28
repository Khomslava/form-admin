import { Action } from '@ngrx/store';

import { IProject } from './../../core/models/project.model';

export enum EProjectActions {
  GetProjects = '[Project] Get Projects',
  GetProjectsSuccess = '[Project] Get Projects Success',
  GetProject = '[Project] Get Project',
  GetProjectSuccess = '[Project] Get Project Success'
}

export class GetProjects implements Action {
  public readonly type = EProjectActions.GetProjects;
}

export class GetProjectsSuccess implements Action {
  public readonly type = EProjectActions.GetProjectsSuccess;
  constructor(public payload: IProject[]) {}
}

export class GetProject implements Action {
  public readonly type = EProjectActions.GetProject;
  constructor(public payload: string) {}
}

export class GetProjectSuccess implements Action {
  public readonly type = EProjectActions.GetProjectSuccess;
  constructor(public payload: IProject) {}
}

export type ProjectActions = GetProjects | GetProjectSuccess | GetProject | GetProjectsSuccess;

