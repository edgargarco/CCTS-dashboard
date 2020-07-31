import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';
import { PersonCredentialListDTO } from 'src/app/DTOs/person-credential-DTO';
import {} from 'rxjs';
import { RolesService } from 'src/app/services/roles/roles.service';
import { RolesAndPrivilegesDTO } from 'src/app/DTOs/roles-and-privileges';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  personCredential: PersonCredentialListDTO[];
  state:boolean;
  roles:RolesAndPrivilegesDTO[];
  error:string;
  constructor(private userService: UserService,private rolesService:RolesService) {}

  ngOnInit(): void {
    this.state = false;
    this.getAllUsers();
    this.getAllRolesAndPrivileges();
  }
  async getAllUsers() {
    await this.userService.getAllAdmins().toPromise().then((e) => {
      this.personCredential = e.result;
      this.state = true;
    }); 
  }
  async getAllRolesAndPrivileges(){
    await this.rolesService.getAllRolesAndPrivileges().toPromise().then(e =>{
      this.roles = e.result
      console.log(this.roles)
    });
  }
  getAdminByUsername(username){
    this.error = '';
    
      this.userService.getAdminByUsername(username).then(e => {
        if(e.status != 200){
          this.error = e.result;
        }
        if(e.status == 200 && this.error === ''){
          this.personCredential = [];
          this.personCredential = e.result;
        } 
      })
  }
}
