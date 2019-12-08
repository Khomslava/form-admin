import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IProjectState } from '../states/project.state';
import { IAppState } from '../states/app.state';

const selectProjects = createFeatureSelector<IProjectState>('projects');

export const selectProjectList = createSelector(
  selectProjects,
  (state: IProjectState) => state.projects
);

export const selectSelectedProject = createSelector(
  selectProjects,
  (state: IProjectState) => state.selectedProject
);

export const selectProjectsByCategory = (category: string) => createSelector(
  selectProjects,
  (state: IProjectState) => {
    if (state.projects && state.projects.length) {
      return state.projects.filter( project => project.categoryId.some( catId => catId === category));
    }
    return [];
  }
);

export const selectProjectById = (projectId: string) => createSelector(
  selectProjects,
  (state: IProjectState) => {
    if (state.projects && state.projects.length) {
      return state.projects.find(project => project.id === projectId);
    }
    return null;
  }
);

