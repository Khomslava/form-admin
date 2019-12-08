
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Store } from '@ngrx/store';

import { map, filter, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  constructor(private http: HttpClient) { }

  getAwards(): Observable<any> {
    return this.http.get(`${environment.firebase.databaseURL}/awards.json`, { observe: 'response' })
    .pipe(
      map(res => res.body)
    );
  }

  updateAward(id: string, award): Observable<any> {
    return this.http.put(`${environment.firebase.databaseURL}/awards/${id}.json`, award, { observe: 'response' });
  }

  createAward(award): Observable<any> {
    return this.http.post(`${environment.firebase.databaseURL}/awards.json`, award, { observe: 'response' });
  }

  deleteAward(id: string): Observable<any> {
    return this.http.get(`${environment.firebase.databaseURL}/awards/${id}.json`, { observe: 'response' });
  }
}
