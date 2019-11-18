import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

// import { AuthApiService } from './auth-api.service';
// import { UsersService } from 'src/app/core/services/users.service';
// import { StorageService } from '../helpers/storage.service';
// import { AuthStorageTokens } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    // private router: Router,
    // protected api: AuthApiService,
    // private storageService: StorageService,
    // private usersService: UsersService
  ) { }

  // public isAuthenticated(): boolean {
  //   return this.checkToken();
  // }

  // public getToken() {
  //   return this.storageService.getFromStorage(AuthStorageTokens.ACCESS_TOKEN);
  // }

  // public checkToken() {
  //   return !!this.storageService.getFromStorage(AuthStorageTokens.ACCESS_TOKEN);
  // }

  // public checkRefreshToken() {
  //   return this.storageService.getFromStorage(AuthStorageTokens.REFRESH_TOKEN);
  // }

  // login(email: string, password: string) {
  //   return this.api
  //     .login({ email, password })
  //     .pipe(tap(authResponse => {
  //       this.setLoginTokens(authResponse.data);
  //       this.setUserData(authResponse.data);
  //     }));
  // }

  // refreshToken() {
  //   const refreshToken = this.storageService.getFromStorage(
  //     AuthStorageTokens.REFRESH_TOKEN
  //   );

  //   return this.api
  //     .refreshToken({ refreshToken })
  //     .pipe(tap(authResponse => this.setLoginTokens(authResponse.data)));
  // }

  // logout() {
  //   this.storageService.removeFromStorage(AuthStorageTokens.ACCESS_TOKEN);
  //   this.storageService.removeFromStorage(AuthStorageTokens.REFRESH_TOKEN);
  //   this.storageService.removeFromStorage(AuthStorageTokens.REMEMBER_ME);
  //   this.storageService.removeFromStorage('user');

  //   this.router.navigate(['/login']);
  // }

  // private setLoginTokens(tokens): void {
  //   const { token, refreshToken } = tokens;

  //   if (isEmpty(token)) {
  //     throw new Error('No Token was found in login response');
  //   }

  //   const rememberMe = this.storageService.localStorageGet(
  //     AuthStorageTokens.REMEMBER_ME
  //   );

  //   if (rememberMe) {
  //     this.storageService.localStorageSet(
  //       AuthStorageTokens.REFRESH_TOKEN,
  //       refreshToken
  //     );
  //   } else {
  //     this.storageService.sessionStorageSet(
  //       AuthStorageTokens.REFRESH_TOKEN,
  //       refreshToken
  //     );
  //   }

  //   this.storageService.localStorageSet(AuthStorageTokens.ACCESS_TOKEN, token);
  // }

  // private setUserData(responseData): void {
  //   const { logoUrl, firstName, lastName, accountId, expiration } = responseData;
  //   const user = {
  //     avatarUrl: logoUrl,
  //     firstName,
  //     lastName,
  //     id: accountId
  //   };

  //   this.usersService.setUserStorage(user);
  // }
}
