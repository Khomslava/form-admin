import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators';

import { SessionStorageService } from 'ngx-webstorage';
import { eAppDirections, tAppDirections, SESSION_KEY_APP_DIRECTION } from './../../shared/consts/storage.consts';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private title$: BehaviorSubject<string> = new BehaviorSubject('');
  private direction$: BehaviorSubject<tAppDirections>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: SessionStorageService
  ) {
    const sessionDirection = this.storage.retrieve(SESSION_KEY_APP_DIRECTION);
    const direction: tAppDirections = sessionDirection && sessionDirection === eAppDirections.RTL ? eAppDirections.RTL : eAppDirections.LTR;
    this.direction$ = new BehaviorSubject(direction);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.activatedRoute),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data.title) {
          this.setTitle(data.title);
        }
      });
  }

  setTitle(title: string) {
    this.title$.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$.asObservable();
  }

  toggleDirection() {
    const direction: tAppDirections = this.direction$.getValue() === eAppDirections.LTR ? eAppDirections.RTL : eAppDirections.LTR;
    this.storage.store(SESSION_KEY_APP_DIRECTION, direction);
    this.direction$.next(direction);
  }

  getDirection(): Observable<tAppDirections> {
    return this.direction$.asObservable();
  }

  isRTL(): Observable<boolean> {
    return this.direction$.asObservable().pipe(switchMap((direction) => of(direction === eAppDirections.RTL)))
  }
}
