import { Component, OnInit } from '@angular/core';
 import { TokenStorageService } from './services/token/token-storage.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
 
 
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
    // const token = this.tokenStorage.getToken();
    // if (token == null) {
    //   this.router.navigate(['/auth/login']);
    // }
  }
}
