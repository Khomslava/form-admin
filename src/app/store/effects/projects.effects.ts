import { selectProjectList } from './../selectors/project.selectors';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of, EMPTY } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';

import { EProjectActions, GetProject, GetProjectSuccess, GetProjects, GetProjectsSuccess, UpdateProject, DeleteProject } from './../actions/project.action';
import { ProjectService } from './../../core/services/project.service';
import { IAppState } from '../states/app.state';

@Injectable()
export class ProjectEffects {

  getProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetProject>(EProjectActions.GetProject),
      map(action => action.payload),
      withLatestFrom(this.store.pipe(select(selectProjectList))),
      switchMap(([id, projects]) => {
        const selectedProject = projects.filter(project => project.id === id)[0];
        return of(new GetProjectSuccess(selectedProject));
      }),
      catchError(() => EMPTY)
    )
  );

  getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetProjects>(EProjectActions.GetProjects),
      switchMap(() => this.projectService.getProjects()),
      switchMap((project) => of(new GetProjectsSuccess(project))),
      catchError(() => EMPTY)
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpdateProject>(EProjectActions.UpdateProject),
      switchMap(action => this.projectService.updateProject(action.payload.id, action.payload)),
      switchMap((project) => of(new GetProjects())),
      catchError(() => EMPTY)
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteProject>(EProjectActions.DeleteProject),
      switchMap(action => this.projectService.deleteProject(action.payload.id)),
      switchMap((project) => of(new GetProjects())),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private projectService: ProjectService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
