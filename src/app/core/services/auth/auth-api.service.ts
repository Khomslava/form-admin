import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// import { AppResponse, AuthResponseModel, LoginRequestModel } from '../../models';
// import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  // private apiNamespace = 'api/identity';

  constructor(
    // private snackBar: MatSnackBar,
    //  protected http: HttpService
     ) {}

  // login(params: LoginRequestModel): Observable<AppResponse<AuthResponseModel>> {
  //   return this.http
  //     .post(`${this.apiNamespace}/loginUser`, params, {})
  //     .pipe(
  //       map((res: any) => {
  //         if (!res.data || !res.data.token) {
  //           throw new HttpErrorResponse({ error: res.data, status: 401 });
  //         }

  //         return res;
  //       }),
  //       catchError(error => {
  //         this.snackBar.open('Failed to login', '', {
  //           duration: 3000
  //         });

  //         return throwError(error);
  //       })
  //     );
  // }

  // refreshToken(params): Observable<AppResponse<AuthResponseModel>> {
  //   return this.http.post<AuthResponseModel>(
  //     `${this.apiNamespace}/loginUser/${params.refreshToken}`,
  //     {},
  //     {}
  //   );
  // }

  // restorUserByEmail(email: string): Observable<any> {
  //   return this.http
  //     .post(`${this.apiNamespace}/restoration`, { email })
  //     .pipe(map((res: AppResponse<any>) => res.data));
  // }

  // resetPassword(password: string, token: string): Observable<any> {
  //   return this.http
  //     .put(`${this.apiNamespace}/restoration/${token}`, { password })
  //     .pipe(map((res: AppResponse<any>) => res.data));
  // }

}
