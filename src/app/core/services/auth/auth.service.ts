import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return true;
  }

  login(email: string, password: string) {

  }

  logout() {

  }

}
