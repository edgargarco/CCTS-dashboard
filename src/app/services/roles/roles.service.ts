import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  customResponseObject: CustomResponseObjectDTO;
  constructor(private http: HttpClient) { }

  public getAllRoles(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/roles')
  }
  public getAllRolesAndPrivileges(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/roles/privileges');
  }
  public updateAdminRoles(admin){
    return this.http.put<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/admin/roles',admin);
  }
}
