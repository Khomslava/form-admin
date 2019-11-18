import {eInnerResultCodes} from './api.model';

export interface AuthResponseModel {
  // data: IAccountRoles; // Account roles
  message: string;
  token: string;
  code: eInnerResultCodes;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}

export enum AuthStorageTokens {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  REMEMBER_ME = 'remember_me'
}
