import { Injectable } from '@angular/core';

const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

@Injectable({ providedIn: 'root' })
export class StorageService {
  public getFromStorage(key: string) {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  }

  public removeFromStorage(key: string) {
    localStorage.removeItem(key);
  }

  public sessionStorageGet(key: string) {
    return sessionStorage.getItem(key);
  }

  public sessionStorageGetObject(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  public sessionStorageRemove(key: string) {
    sessionStorage.removeItem(key);
  }

  public sessionStorageSet(key: string, value: string) {
    return sessionStorage.setItem(key, value);
  }

  public localStorageGet(key: string) {
    return localStorage.getItem(key);
  }

  public localStorageGetObject(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public localStorageRemove(key: string) {
    localStorage.removeItem(key);
  }

  public localStorageSet(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
