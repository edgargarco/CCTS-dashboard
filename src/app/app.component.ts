import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TokenStorageService } from './services/token/token-storage.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
//import {slider, transformer, fader, stepper} from './rou'
declare var JQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  title = 'covid-dashboard';
  ngOnInit() {
    let token = this.tokenStorage.getToken();
    console.log(token);
    if (token == null) {
      this.router.navigate(['/auth/login']);
    }
  }
}
