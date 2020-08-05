import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserDTO } from 'src/app/DTOs/Register/RegisterUserDTO';
import { UserService } from 'src/app/services/user-services/user.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  myForm: FormGroup;
  user:RegisterUserDTO;
  constructor(private formBuilder: FormBuilder,
    private userService:UserService, private authService: AuthService,
    private tokenStorage: TokenStorageService,private router:Router) { }

  ngOnInit(): void {
    this.bootstrapForm();
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }
  bootstrapForm(){
    this.myForm = this.formBuilder.group({
      personalIdentifier: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(2),Validators.email]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  async onSubmit(){
    this.user = this.myForm.value;
   await this.userService.registerNewUser(this.user).toPromise().then(
      async e => {
        if(e.status === 200){
          await this.authService.login( {
            username: this.user.username,
            password: this.user.password,
          }).toPromise().then((result) => {
            this.tokenStorage.saveToken(result.result);
            this.reloadPage();
          });
        }
      }
    )
    console.log(this.user)
  }
  reloadPage() {
    window.location.reload();
  }

  get personalIdentifier() {
    return this.myForm.get('personalIdentifier');
  }
  get email() {
    return this.myForm.get('email');
  }
  get username() {
    return this.myForm.get('username');
  }
  get password() {
    return this.myForm.get('password');
  }

}
