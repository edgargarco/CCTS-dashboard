import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
const AUTH_API = 'http://localhost:8080/api/dashboard/';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  customResponseObject: CustomResponseObjectDTO;
  constructor(private http: HttpClient) { }

  public getAllRoles(){
    return this.http.get<CustomResponseObjectDTO>(AUTH_API+'roles')
  }
  public getAllRolesAndPrivileges(){
    return this.http.get<CustomResponseObjectDTO>(AUTH_API+'roles/privileges');
  }
  public updateAdminRoles(admin){
    return this.http.put<CustomResponseObjectDTO>(AUTH_API+'admin/roles',admin);
  }
}
