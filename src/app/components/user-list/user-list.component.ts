import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';
import { PersonCredentialListDTO } from 'src/app/DTOs/person-credential-DTO';
import {} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  personCredential: PersonCredentialListDTO[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((e) => {
      this.personCredential = <PersonCredentialListDTO[]>e.result;
    });
  }
}
