import { IProject } from '../../core/models';

export interface IProjectState {
  projects: IProject[];
  selectedProject: IProject;
}

export const initialProjectState: IProjectState = {
  projects: null,
  selectedProject: null
};

