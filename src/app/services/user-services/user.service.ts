import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientDetails } from 'src/app/DTOs/patient-details';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { PatientUpdateDTO } from 'src/app/DTOs/patiend-update-DTO';
const AUTH_API = 'http://localhost:8080/api/dashboard/';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  customResponseObject: CustomResponseObjectDTO;
  patient: PatientDetails;
  constructor(private http: HttpClient) { }

  public async getPatientByIdentifier(id: string) {
    await this.http.get<CustomResponseObjectDTO>(
      AUTH_API + 'test/patient/' + id
    ).toPromise().then(e => {
      this.customResponseObject = e;
    });
    console.log(this.customResponseObject)
    return this.customResponseObject;
  }
  public getAllAdmins() {
    return this.http.get<CustomResponseObjectDTO>(
      AUTH_API + 'admins'
    );
  }
  // public getAllUsers() {
  //   return this.http.get<CustomResponseObjectDTO>(
  //     AUTH_API + 'users'
  //   );
  // }

  public createNewUser(patient: PatientDetails) {
    return this.http.post<CustomResponseObjectDTO>(
      AUTH_API + 'new/user',
      patient
    );
  }
  public updatePatientStatus(patient: PatientUpdateDTO) {
     return this.http.put<CustomResponseObjectDTO>(
      AUTH_API + 'covid-test/set-patient-status',
      patient
    );
  }
}
