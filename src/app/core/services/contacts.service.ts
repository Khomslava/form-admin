import { IContacts } from './../models/contacts.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient,
    private store: Store<any[]>
  ) {}

  getContacts(): Observable<IContacts[]> {
    return this.http.get<IContacts[]>(`${environment.firebase.databaseURL}/contacts.json`);
  }

  updateContacts(contacts) {
    return this.http.put(`${environment.firebase.databaseURL}/contacts.json`, contacts, { observe: 'response' });
  }

}
