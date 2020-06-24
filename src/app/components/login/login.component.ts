import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GenericAuthResponse } from 'src/app/DTOs/generic-auth-response';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Router } from '@angular/router';
import { Jwt } from 'src/app/DTOs/jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {};

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }
  onSubmit() {
    let resp = this.authService.login(this.form);
    resp.subscribe((result) => {
      this.tokenStorage.saveToken(result.result);
      this.reloadPage();
    });
  }
  reloadPage() {
    window.location.reload();
  }
}
