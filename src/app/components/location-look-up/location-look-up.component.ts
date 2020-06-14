import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { ActivatedRoute } from '@angular/router';
import { LocationNodeDetails } from 'src/app/DTOs/location-node-details';
@Component({
  selector: 'app-location-look-up',
  templateUrl: './location-look-up.component.html',
  styleUrls: ['./location-look-up.component.scss'],
})
export class LocationLookUpComponent implements OnInit {
  localityDetails: LocationNodeDetails;
  constructor(
    private locationNodesService: LocationNodesService,
    private route: ActivatedRoute,
    private locationNodeService: LocationNodesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleLocationNodeDetails();
    });
  }
  handleLocationNodeDetails() {
    const locationId: number = +this.route.snapshot.paramMap.get('id');
    this.locationNodeService
      .getLocationNodeById(locationId)
      .subscribe((data) => {
        this.localityDetails = data;
      });
  }
}
