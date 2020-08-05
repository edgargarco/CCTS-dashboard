import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Jwt } from 'src/app/DTOs/jwt';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jwt_dto: Jwt;
  aux:any;
  state:boolean;
  constructor(private tokenService: TokenStorageService,private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.checkTokenPrivilege(next,state);
  }

  checkTokenPrivilege(route: ActivatedRouteSnapshot, url: any):boolean{
     this.state = false;
    if(this.tokenService.getToken()){
      this.jwt_dto = this.tokenService.getDecodedToken();
      this.jwt_dto.authorities.forEach((element)=>{
        this.aux = element;
        if(this.aux.authority === route.data.authority){
           this.state = true;
        }
      })
      return this.state;
    }
    this.router.navigateByUrl('/auth/login');
    return this.state;

  }
  
}
