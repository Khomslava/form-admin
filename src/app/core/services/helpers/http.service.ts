import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

// import { AppResponse, OrderType, ServerHttpResponseBody, AppError } from '../../models';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    // this.baseUrl = `${environment.BASE_URL}`;
  }

  // get<T>(url: string, options?): Observable<AppResponse<T>> {
  //   const requestOptions = this.createRequestOptions(options, 'GET');
  //   return this.httpClient
  //     .get<ServerHttpResponseBody<T>>(`${this.baseUrl}/${url}`, requestOptions)
  //     .pipe(
  //       map(this.handleResponse),
  //       catchError(this.handleError)
  //     );
  // }

  // getFile(url: string): Observable<any> {
  //   const options = {
  //     responseType: 'blob',
  //     observe: 'response'
  //   };

  //   const requestOptions = this.createRequestOptions(options, 'GET');

  //   return this.httpClient
  //     .get<Blob>(`${this.baseUrl}/${url}`, requestOptions )
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // post<T>(url: string, body?, options?): Observable<AppResponse<T>> {
  //   const requestOptions = this.createRequestOptions(options, 'POST');
  //   return this.httpClient
  //     .post<ServerHttpResponseBody<T>>(
  //       `${this.baseUrl}/${url}`,
  //       body,
  //       requestOptions
  //     )
  //     .pipe(
  //       map(this.handleResponse),
  //       catchError(this.handleError)
  //     );
  // }

  // patch<T>(url: string, body?, options?): Observable<AppResponse<T>> {
  //   const requestOptions = this.createRequestOptions(options, 'PATCH');
  //   return this.httpClient
  //     .patch<ServerHttpResponseBody<T>>(
  //       `${this.baseUrl}/${url}`,
  //       body,
  //       requestOptions
  //     )
  //     .pipe(
  //       map(this.handleResponse),
  //       catchError(this.handleError)
  //     );
  // }

  // put<T>(url: string, body?, options?): Observable<AppResponse<T>> {
  //   const requestOptions = this.createRequestOptions(options, 'PUT');
  //   return this.httpClient
  //     .put<ServerHttpResponseBody<T>>(
  //       `${this.baseUrl}/${url}`,
  //       body,
  //       requestOptions
  //     )
  //     .pipe(
  //       map(this.handleResponse),
  //       catchError(this.handleError)
  //     );
  // }

  // delete<T>(url: string, options?, body?): Observable<any> {
  //   const requestOptions = this.createRequestOptions(options, 'DELETE');
  //   if (body) {
  //     requestOptions.body = body;
  //   }
  //   return this.httpClient
  //     .delete<AppResponse<T>>(`${this.baseUrl}/${url}`, requestOptions)
  //     .pipe(
  //       map(res => {
  //         // tslint:disable-next-line:no-string-literal
  //         return this.handleDeleteResponse(res['body']);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  // createHttpQueryParams(queryParams: {[key: string]: any}, isExportFile = false): HttpParams {
  //   let params = new HttpParams()
  //     .set('SearchTerm', queryParams.searchTerm || '')
  //     .set('Paging.Skip', !isExportFile ? queryParams.pagingSkip : 0)
  //     .set('Paging.Limit', !isExportFile ? queryParams.pagingLimit : 9999);

  //   if (queryParams.sortField && queryParams.sortOrder) {
  //     params = params.append('Sort.SortField', queryParams.sortField);
  //     params = params.append('Sort.SortOrder', OrderType[queryParams.sortOrder]);
  //   }

  //   return params;
  // }

  // private createRequestOptions(options, method) {
  //   let headers = options && options.headers ? options.headers : null;
  //   let params: HttpParams = null;
  //   switch (method) {
  //     case 'GET':
  //     case 'PUT':
  //       if (!this.headersOfType(headers, 'Content-Type')) {
  //         // Add only if there is no such Header
  //         headers = new HttpHeaders(headers).set(
  //           'Content-Type',
  //           'application/json'
  //         );
  //       }
  //       break;
  //     case 'DELETE':
  //       headers = new HttpHeaders(headers);
  //       break;
  //     case 'POST':
  //       headers = new HttpHeaders(headers); // .set('Content-Type', 'application/json'); // Must be JSON
  //       break;
  //   }
  //   if (options && options.params) {
  //     params = new HttpParams();
  //     Object.keys(options.params).map(
  //       key => (params = params.set(key, options.params[key]))
  //     );
  //   }
  //   const observe: 'response' = 'response';
  //   const withCredentials = environment.production; // needs to be false in order to see the data from the server
  //   return {
  //     ...options,
  //     headers,
  //     params,
  //     observe, // get full response instead of just the body with the observe option
  //     withCredentials // Add cookies to each api call
  //   };
  // }

  // private headersOfType(headers: HttpHeaders, contentType: string): boolean {
  //   return (
  //     headers !== null &&
  //     headers instanceof HttpHeaders &&
  //     headers.has(contentType)
  //   );
  // }

  // /**
  //  * handleDeleteResponse
  //  * Map response to AppResponse model
  //  * @param response HttpResponseBody
  //  */
  // private handleDeleteResponse<T>(response: AppResponse<T>): AppResponse<T> {
  //   return new AppResponse<T>({ data: response });
  // }

  // /**
  //  * handleResponse
  //  * Map response to AppResponse model
  //  * @param response HttpResponse
  //  */
  // private handleResponse<T>(response: HttpResponse<ServerHttpResponseBody<T>>): AppResponse<T> {
  //   if (response.body.innerCode !== 0) {
  //     return new AppResponse<T>({data: response.body});
  //   }

  //   if (response.body instanceof Blob) {
  //     return new AppResponse<T>({data: response.body});
  //   }
  //   return new AppResponse<T>({data: response.body.data});
  // }

  // private handleError(error: AppError) {

  //   // Optional - Handle specific Http-Errors (other then the Error.interceptor)
  //   return throwError(error);
  // }
}
