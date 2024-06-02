import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InitUser, Role, LoginResponse, UserProfileResponse } from '../models/user.model';
import { environment } from '../../../src/environments/environment';

@Injectable()
export class UserService {
  public url: string;

  initialUser: InitUser = {
    username: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  postUser(user: InitUser) {
    return this.http.post(`${this.url}/register`, user, this.noAuthHeader);
  }

  login(authCredentials: { email: string, password: string }) {
    return this.http.post<LoginResponse>(`${this.url}/authenticate`, authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get<UserProfileResponse>(`${this.url}/user-profile`);
  }

  // updateUser(user: UserAdmin): Observable<any>{
  //   const params = JSON.stringify(user);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.put<any>(`${this.url}/update-user`, params, { headers: headers });
  // }

  setToken(token: string): void {
    console.log(token);
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = window.atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    console.log('is logged in:', userPayload ? true : false);
    console.log('user payload: ', userPayload);
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      this.deleteToken();
      return false;
    }
  }

  getRoles(): Role[] | false {
    const roles = this.getUserPayload().roles;
    if (roles) {
      return roles;
    }
    return false;
  }

}
