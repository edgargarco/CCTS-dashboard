import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CovidSummary } from 'src/app/DTOs/covid-data-summary-response';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';


const API_URL = 'http://localhost:8080/api/statistics/';
@Injectable({
  providedIn: 'root',
})
export class CovidApiService {
  constructor(private http: HttpClient) { }

  getCovidTotalCasesSummary() {
    return this.http.get<CustomResponseObjectDTO>(API_URL+'dashboard');
  }
}
