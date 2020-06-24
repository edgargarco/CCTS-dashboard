import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationNodeDetails } from 'src/app/DTOs/location-node-details';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';
const AUTH_API = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root',
})
export class LocationNodesService {
  locationList: NodeDistribution[];
  customResponseObject: CustomResponseObjectDTO;
  constructor(private http: HttpClient) { }

  public async getLocationNodeById(id) {
    await this.http.get<CustomResponseObjectDTO>(
      AUTH_API + 'api/dashboard/locality/' + id
    ).toPromise().then(e => {
      this.customResponseObject = e;

    });
    return this.customResponseObject.result;
  }
  public async getLocationContainingName(keyword) {
    await this.http.get<CustomResponseObjectDTO>(
      AUTH_API + 'api/dashboard/node-distribution/containing/' + keyword
    ).toPromise().then(e => {
      this.locationList = e.result;
    });
    return this.locationList;
  }
  public async getNodeDistributionByLocation() {
    await this.http.get<CustomResponseObjectDTO>(
      AUTH_API + 'api/dashboard/node-distribution'
    ).toPromise().then(e => {
      this.locationList = e.result;

    })
    return this.locationList;
  }
  public getLocationNameAndId() {
    return this.http.get<CustomResponseObjectDTO>(
      AUTH_API + 'api/dashboard/listLocations'
    );
  }
}
