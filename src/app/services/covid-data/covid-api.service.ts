import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CovidSummary } from 'src/app/DTOs/covid-data-summary-response';


const API_URL = 'https://api.covid19api.com/summary';
@Injectable({
  providedIn: 'root',
})
export class CovidApiService {
  constructor(private http: HttpClient) { }

  getCovidTotalCasesSummary() {
    return this.http.get<CovidSummary>(API_URL);
  }
}
