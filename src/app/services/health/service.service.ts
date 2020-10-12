import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient:HttpClient) { }

  public getCount(){
    return this.httpClient.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/health/status/count');
  }

  public kNearestInfectors(id){
    return this.httpClient.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/health/status/infection/chain/'+id);
  }
}
