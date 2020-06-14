import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericAuthResponse } from 'src/app/DTOs/generic-auth-response';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth_response: GenericAuthResponse;
  json: any;
  constructor(private http: HttpClient) {}
  public login(credentials) {
    return this.http.post<GenericAuthResponse>(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password,
    });
  }
}
