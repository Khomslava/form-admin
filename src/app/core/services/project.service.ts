import { IProject } from './../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Store } from '@ngrx/store';

import { map, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects$: Observable<any[]>;
  private projectsRef$: AngularFireList<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private store: Store<IProject[]>
  ) {
    this.projects$ = db.list('projects').valueChanges();
    this.projectsRef$ = db.list('projects');
  }

  getProjects(): Observable<any[]>  {
    return this.projects$;
  }

  getProjectById(id: string): Observable<any> {
    return this.projects$.pipe(
      map( projects => {
        const filtedProjecs = projects.filter( proj => proj.id === id);
        return filtedProjecs && filtedProjecs.length ? filtedProjecs[0] : of({});
      })
    );
  }

  createProject(project) {
    return this.http.post(`${environment.firebase.databaseURL}/projects.json`, project, { observe: 'response' });
  }

  updateProject(key: string, project) {
    return this.http.put(`${environment.firebase.databaseURL}/projects/${key}/.json`, project, { observe: 'response' });
  }

  updateProjectFirebase(key: string, project) {
    this.projectsRef$.update(key, project);
  }

  deleteProject(key: string) {
    return this.http.delete(`${environment.firebase.databaseURL}/projects/${key}.json`);
  }
}
