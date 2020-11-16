import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { ProjectStatistics } from 'src/app/DTOs/Projectstatistics/Projectstatistics';
import { environment } from 'src/environments/environment';
 @Injectable({
  providedIn: 'root'
})
export class ProjectStatisticsService {
  projectStatistics:ProjectStatistics[];
  constructor(private http:HttpClient) { }

   getStatistics(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/statistics/project/all/'+10);
  }
  getNodesLocationMarker(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/statistics/project/location/nodes');
  }
  getProvinceDetails(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/statistics/provinces');
  }
}
