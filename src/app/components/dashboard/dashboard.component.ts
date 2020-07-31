import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Jwt } from 'src/app/DTOs/jwt';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username: string;
  initials:string;
  jwt_dto: Jwt;
  aux:any;
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.jqueyInit();
    this.userDetails();
  }
  public userDetails() {
    const jwt_dto = this.tokenStorage.getDecodedToken();
    this.username = jwt_dto.sub;
    const res = jwt_dto.name.split(' ');
    this.initials = res[0].charAt(0)+res[1].charAt(0);
   }

  public jqueyInit() {
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
    $(function () {
      $('[data-toggle="tooltip"]').tooltip;
    });
  }

  public logOut() {
    this.tokenStorage.removeToken();
  }
  public checkUserPrivileges(privilege:string){
    console.log(privilege)
    let state = false;
    this.jwt_dto = this.tokenStorage.getDecodedToken()
    this.jwt_dto.authorities.forEach( e => {
      this.aux = e;
      if(this.aux.authority === privilege){
        state = true;
        
      }
    })
    return state;
  }
}
