import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GenericAuthResponse } from 'src/app/DTOs/generic-auth-response';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Router } from '@angular/router';
import { Jwt } from 'src/app/DTOs/jwt';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/dashboard']);
    }
    this.bootstrapForm();
  }
  bootstrapForm(){
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  onSubmit() {
     
    if(this.myForm){
      this.authService.login(this.myForm.value).subscribe((result) => {
      this.tokenStorage.saveToken(result.result);
      this.reloadPage();
    });
    }
  }
  reloadPage() {
    window.location.reload();
  }
  get username() {
    return this.myForm.get('username');
  }
  get password() {
    return this.myForm.get('password');
  }
}
