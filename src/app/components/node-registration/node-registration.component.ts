import { Component, OnInit } from '@angular/core';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { LocalityByNameIdDTO } from 'src/app/DTOs/locality-name-id';

@Component({
  selector: 'app-node-registration',
  templateUrl: './node-registration.component.html',
  styleUrls: ['./node-registration.component.scss'],
})
export class NodeRegistrationComponent implements OnInit {
  locationList: LocalityByNameIdDTO[];
  constructor(private locationService: LocationNodesService) {}

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getLocationNameAndId().subscribe((e) => {
      this.locationList = <LocalityByNameIdDTO[]>e.result;
    });
  }
}
