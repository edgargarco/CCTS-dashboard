import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { ProjectStatistics } from 'src/app/DTOs/Projectstatistics/Projectstatistics';
const API_URL = 'http://localhost:8080/api/statistics/project/'
@Injectable({
  providedIn: 'root'
})
export class ProjectStatisticsService {
  projectStatistics:ProjectStatistics[];
  constructor(private http:HttpClient) { }

   getStatistics(){
    return this.http.get<CustomResponseObjectDTO>(API_URL+'all/'+10);
  }
  getNodesLocationMarker(){
    return this.http.get<CustomResponseObjectDTO>(API_URL+'location/nodes');
  }
}
