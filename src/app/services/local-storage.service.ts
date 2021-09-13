import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(token: TokenModel) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiration', token.expiration);
  }

  getToken() {
    localStorage.getItem('token');
    localStorage.removeItem('expiration');
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  setCurrentUser(firstName:string, lastName:string) {
    localStorage.setItem('currentUser', firstName + ' ' + lastName);
  }

  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  removeCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  setCurrentUserEmail(email: string) {
    localStorage.setItem('currentUserEmail', email);
  }
  getCurrentUserEmail() {
    return localStorage.getItem('currentUserEmail');
  }
  removeCurrentUserEmail() {
    return localStorage.removeItem('currentUserEmail');
  }


}
