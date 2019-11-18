import {HttpHeaders} from '@angular/common/http';

// export class AppResponse<T> {
//   data: T;
//   summary: Summary;
//   token: string;
//   isValid = true; // can be overridden using the validate()

//   constructor({data, summary = null, token = null}) {
//     this.data = data;
//     this.summary = summary;
//     this.token = token;
//   }

//   /** validate (Optional usage)
//    * validate the data along the application flow
//    * For example: not valid if has less then 5 records...
//    */
//   validate(logic: (data, summary?) => boolean) {
//     this.isValid = logic(this.data, this.summary);
//     return this.isValid;
//   }
// }

export enum eHttpResponseStatus {
  Failed = 0,
  Success = 1,
  ShortQuery = 2,
  NotFound = 3
}

export interface ServerHttpResponseBody<T> {
  isSuccessful: boolean;
  statusCode: eHttpResponseStatus;
  innerCode: eInnerResultCodes;
  message: string;
  description: string;
  exception?: any;
  exceptionString?: string;
  data: T;
}

export interface Summary {
  skip: number;
  limit: number;
  total?: number;
}

export interface ApiResponse<T> {
  data: T;
  description: string;
  exception: string;
  innerCode: number;
  statusCode: number;
}

export const HttpUploadOptions = {
   headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryCnphyRzmxmTUnFSS'})
};

export enum eInnerResultCodes {
  Ok = 0,
  Success = 200,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,

  // Internal server errors
  // Add additional error here (align with server errors)
  DatabaseError = 1000,

  UnknownError = 9999
}

export interface ConsumersQueryModel {
  searchTerm: string;
  sortField: string;
  sortOrder: string;
  hasErrors: boolean;
  retailerIds: number[];
  statuses: number[];
  pagingSkip: number;
  pagingLimit: number;
}


export interface TransactionsQueryModel {
  searchTerm: string;
  types: string[];
  statuses: string[];
  pagingSkip: number;
  pagingLimit: number;
  buyerIds?: number[];
  buyerTypes?: string[];
}

export interface CommissionTypeQueryModel {
  pagingSkip: number;
  pagingLimit: number;
}

export interface BrandsQueryModel {
  searchTerm: string;
  statuses: string[];
  pagingSkip: number;
  pagingLimit: number;
}

export enum ConsumersQueryDefenition {
  search = 'SearchTerm',
  sortActiveCol = 'Sort.SortField',
  sortDirection = 'Sort.SortOrder',
  failedTransaction = 'Data.HasErrors',
  retailerSites = 'Data.RetailerIds',
  statuses = 'Data.Statuses',
  pagingSkip = 'Paging.Skip',
  pagingLimit = 'Paging.Limit'
}

export enum OrderType {
  asc = 'Ascending',
  desc = 'Descending'
}

export interface RetailersQueryModel {
  searchTerm: string;
  sortField: string;
  sortOrder: string;
  statuses: number[];
  agreementTypes: string[];
  pagingSkip: number;
  pagingLimit: number;
}

export interface GiftCardsQueryModel {
  searchTerm: string;
  statuses: string[];
  pagingSkip: number;
  pagingLimit: number;
  сonsumerIds?: string[];
}
