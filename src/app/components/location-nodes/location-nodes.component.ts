import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { SearchFormComponent } from '../reusable-components/search-form/search-form.component';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
 @Component({
  selector: 'app-location-nodes',
  templateUrl: './location-nodes.component.html',
  styleUrls: ['./location-nodes.component.scss'],
})
export class LocationNodesComponent implements OnInit {
  nodeDistribution: NodeDistribution[];
  error: string;
  state: boolean;
  @ViewChild(SearchFormComponent) search;
  title = 'Identificador de localidad'
  constructor(
    private locationNodeService: LocationNodesService,
    private shareDataService:ShareDataService
  ) { }

  ngOnInit(): void {
    this.state = false;
    this.getNodeDistribution();
    

  }

  public async getNodeDistribution() {
    await this.locationNodeService
      .getNodeDistributionByLocation().then(e => this.nodeDistribution = e);
    this.state = true;
  }

  public async getNodesContainingName(keyword: string) {
    this.state = false;
    this.error = '';
    this.nodeDistribution = [];
    if (keyword) {
      await this.locationNodeService
        .getLocationContainingName(keyword).then(e => {
          if (e.status != 200) {
            this.error = e.result;
          } 
          if(this.error === ''){
            this.nodeDistribution = e.result;
          }
         })
      this.state = true;
      return this.nodeDistribution;
    }
    this.state = true;
  }
}
