import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationNodeDetails } from 'src/app/DTOs/location-node-details';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
import { LocalityDTO } from 'src/app/DTOs/locality-dto';
import { RealTimeSearch } from 'src/app/DTOs/RealTimeSearch/real-time-search';
import { environment } from 'src/environments/environment';
 @Injectable({
  providedIn: 'root',
})
export class LocationNodesService {
  locationList: NodeDistribution[];
  customResponseObject: CustomResponseObjectDTO;
  realTimeSearch:RealTimeSearch[];
  
  constructor(private http: HttpClient) { }

  public async getLocationNodeById(id) {
    await this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/locations/' + id
    ).toPromise().then(e => {
      this.customResponseObject = e;
    });
    return this.customResponseObject.result;
  }
  public async getLocationContainingName(keyword) {
    await this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/node-distribution/containing/' + keyword
    ).toPromise().then(e => {
      this.customResponseObject =  e;
    });
    return this.customResponseObject;
   }
  public async getNodeDistributionByLocation() {
    await this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/node-distribution'
    ).toPromise().then(e => {
      this.locationList = e.result;
    })
    return this.locationList;
  }
  public async getNodeDistributionByLocationPaginated(page) {
    await this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/node-distribution/'+page
    ).toPromise().then(e => {
      this.locationList = e.result;
    })
    return this.locationList;
  }

  public countLocations(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/node-distribution/count');
  }
  public getLocationNameAndId() {
    return this.http.get<CustomResponseObjectDTO>(
      environment.apiUrl + 'api/dashboard/locations'
    );
  }
  public getHealthLocalities(){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/locations/health');
  }
  public createNewLocation(locality:LocalityDTO){
    return this.http.post<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/location',locality);
  }
  public findByTypeAndNameAndEmailAndId(element:RealTimeSearch){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/locations/health/'+element.name+'/'+element.email+'/'+element.id);
  }
  public findByNameAndEmailAndId(element:RealTimeSearch){
    return this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/locations/'+element.name+'/'+element.email+'/'+element.id);
  }
  public asignUsersToLocality(users){
    return this.http.put<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/locality/users',users);
  }
  public createNodesInLocality(nodeDetail){
    console.warn(nodeDetail)
    return this.http.put<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/locality/node',nodeDetail);
  }
  public async realTimeSearchLocality(name){
    await this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/locations/health/containing/'+name).toPromise()
    .then(e => {
           this.realTimeSearch = e.result; 
    });
     return this.realTimeSearch;
  }
  public async realTimeSearchAllLocality(name){
    await this.http.get<CustomResponseObjectDTO>(environment.apiUrl+'api/dashboard/locations/containing/'+name).toPromise()
    .then(e => {
           this.realTimeSearch = e.result; 
    });
     return this.realTimeSearch;
  }
}
