import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Jwt } from 'src/app/DTOs/jwt';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  jwt_dto: Jwt;
  constructor() {}
  public saveToken(token) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public getDecodedToken() {
    if(window.sessionStorage.getItem(TOKEN_KEY)){
      const token = window.sessionStorage.getItem(TOKEN_KEY);
      const decoded = jwt_decode(token);
      this.jwt_dto = decoded;
    }
    return this.jwt_dto;
  }
  public removeToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    this.reloadPage();
  }
  reloadPage() {
    window.location.reload();
  }
}
