import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationNodeDetails } from 'src/app/DTOs/location-node-details';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';
const AUTH_API = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root',
})
export class LocationNodesService {
  locationList: NodeDistribution[];
  constructor(private http: HttpClient) {}

  public getLocationNodeById(id) {
    return this.http.get<LocationNodeDetails>(
      AUTH_API + 'api/dashboard/locality/' + id
    );
  }
  public getLocationContainingName(keyword) {
    return this.http.get<NodeDistribution[]>(
      AUTH_API + 'api/dashboard/node-distribution/containing/' + keyword
    );
  }
  public getNodeDistributionByLocation() {
    return this.http.get<NodeDistribution[]>(
      AUTH_API + 'api/dashboard/node-distribution'
    );
  }
}
