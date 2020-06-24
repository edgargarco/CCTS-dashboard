import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username: string;
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.jqueyInit();
    this.userDetails();
  }
  public userDetails() {
    let token = this.tokenStorage.getDecodedToken();
    this.username = token.sub;
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
}
