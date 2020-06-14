import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
const AUTH_API = 'http://localhost:8080/';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  username: string;
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}
  public helloWorld(): Observable<any> {
    let req = this.http.get(AUTH_API + 'public/', {
      responseType: 'text',
    });

    req.subscribe((data) => console.log(data));
    return req;
  }
}
