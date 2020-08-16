import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientDetails } from 'src/app/DTOs/patient-details';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { PatientUpdateDTO } from 'src/app/DTOs/patiend-update-DTO';
import { RegisterUserDTO } from 'src/app/DTOs/Register/RegisterUserDTO';
import { environment } from 'src/environments/environment';
 @Injectable({
  providedIn: 'root',
})
export class UserService {
  customResponseObject: CustomResponseObjectDTO;
  patient: PatientDetails;
  constructor(private http: HttpClient) { }

  public async getPatientByIdentifier(id: string) {
    await this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/test/patient/' + id
    ).toPromise().then(e => {
      this.customResponseObject = e;
    });
     return this.customResponseObject;
  }
  public getAllAdmins() {
    return this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/admins'
    );
  }
  public getAllAdminsPaginated(page) {
    return this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/admins/page/'+page
    );
  }
  public getAdminCount(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/admins/count');
  }
  public async getAdminByUsername(username:string){
    await this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl+'api/dashboard/admins/'+ username).toPromise().then(e =>{
        this.customResponseObject = e;
      });
      return this.customResponseObject;
  }
  // public getAllUsers() {
  //   return this.http.get<CustomResponseObjectDTO>(
  //     AUTH_API + 'users'
  //   );
  // }

  public createNewUser(patient: PatientDetails) {
    return this.http.post<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/new/user',
      patient
    );
  }
  public updatePatientStatus(patient: PatientUpdateDTO) {
     return this.http.put<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/covid-test/set-patient-status',
      patient
    );
  }

  public getAllNotEmployedAdmins(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/admins/health/unregistered');
  }
  public registerNewUser(user:RegisterUserDTO){
    return this.http.post<CustomResponseObjectDTO>(environment.apiUrl+'api/public/signup',user);
  }
}
