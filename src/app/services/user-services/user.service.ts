import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientDetails } from 'src/app/DTOs/patient-details';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
const AUTH_API = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  public getPatientByIdentifier(id: string) {
    return this.http.get<PatientDetails>(
      AUTH_API + 'api/dashboard/covid-test/findPatientById/' + id
    );
  }

  public getAllUsers() {
    return this.http.get<CustomResponseObjectDTO>(
      AUTH_API + 'api/dashboard/listUsers'
    );
  }

  public createNewUser(patiend: PatientDetails) {
    return this.http.post<CustomResponseObjectDTO>(
      AUTH_API + 'api/dashboard/new/user',
      patiend
    );
  }
}
