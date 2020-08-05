import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { ActivatedRoute } from '@angular/router';
import { LocationNodeDetails } from 'src/app/DTOs/location-node-details';
import { async } from '@angular/core/testing';
import { CustomAgmMarker } from 'src/app/classes/CustomMarket';
import { MarkerManager } from '@agm/core';
@Component({
  selector: 'app-location-look-up',
  templateUrl: './location-look-up.component.html',
  styleUrls: ['./location-look-up.component.scss'],
})
export class LocationLookUpComponent implements OnInit {
  localityDetails: LocationNodeDetails;
  state: boolean;
  latitude:number;
  longitude:number;
  mapType = 'roadmap';
  mapOptions = { zoom: 15 }
   
  constructor(
    private route: ActivatedRoute,
    private locationNodeService: LocationNodesService,
     
  ) { }

  ngOnInit(): void {
    this.state = false;
    this.route.paramMap.subscribe(() => {
      this.handleLocationNodeDetails();
    });
  }
  async handleLocationNodeDetails() {

    const locationId: number = +this.route.snapshot.paramMap.get('id');
    await this.locationNodeService
      .getLocationNodeById(locationId).then(e => this.localityDetails = e);
      this.latitude = this.localityDetails.gpsLocation.latitude;
      this.longitude = this.localityDetails.gpsLocation.longitude;
    this.state = true;

  }

}
