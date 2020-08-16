import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CovidSummary } from 'src/app/DTOs/covid-data-summary-response';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { GenericXYDTO } from 'src/app/DTOs/GlobalStatistics/GenericXYDTO';
import { environment } from 'src/environments/environment';


 @Injectable({
  providedIn: 'root',
})
export class CovidApiService {
  list:[];
  constructor(private http: HttpClient) { }

  getCovidTotalCasesSummary() {
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/statistics/dashboard');
  }
  async getInfectedByTimeIntervalFromCurrentDate(){
    await this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/statistics/infected/'+15).toPromise().then(
      e => {
        this.list = e.result;
        this.list.reverse();
      }
    );
    return this.list;
  }
}
