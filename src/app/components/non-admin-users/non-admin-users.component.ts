import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-non-admin-users',
  templateUrl: './non-admin-users.component.html',
  styleUrls: ['./non-admin-users.component.scss']
})
export class NonAdminUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().toPromise().then(
      e => {
        console.log(e)
      }
    )
  }

}
