import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientDetails } from 'src/app/DTOs/patient-details';
import { PatientUpdateDTO } from 'src/app/DTOs/patiend-update-DTO';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class TestResultService {
  constructor(private http: HttpClient) {}

  public getPatientByIdentifier(id: string) {
    return this.http.get<PatientDetails>(
      AUTH_API + 'api/dashboard/covid-test/findPatientById/' + id
    );
  }

  public updatePatientStatus(patient: PatientUpdateDTO) {
    return this.http.put<CustomResponseObjectDTO>(
      AUTH_API + 'api/dashboard/covid-test/set-patient-status',
      patient
    );
  }
}
