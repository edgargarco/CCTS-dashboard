import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericAuthResponse } from 'src/app/DTOs/generic-auth-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

 @Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth_response: GenericAuthResponse;
  json: any;
  constructor(private http: HttpClient) {}
  public login(credentials) {
    return this.http.post<GenericAuthResponse>(environment.apiUrl + 'login', {
      username: credentials.username,
      password: credentials.password,
    });
  }
}
