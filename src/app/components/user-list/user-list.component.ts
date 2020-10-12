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

  page = 1;
  pageNumber:number;
  pageChange:number;
  constructor(private userService: UserService,private rolesService:RolesService) {}

  ngOnInit(): void {
    this.state = false;
    this.getAllUsers();
    this.getAllRolesAndPrivileges();
    this.userService.getAdminCount().toPromise().then( e => {
      this.pageNumber = Math.round((e.result)/5)
      if(this.pageNumber == 1){
        this.pageNumber = 1;
      }
    })
  }
  async getAllUsers() {
    await this.userService.getAllAdminsPaginated(this.page).toPromise().then((e) => {
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

  getLocationsOnPage($event){
    console.log($event)
    this.getAllUsers();
  }
}
