import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.projects = db.list('projects').valueChanges();
    console.log(this.projects);
  }

  getProjects() {
    return this.projects;
  }
}
