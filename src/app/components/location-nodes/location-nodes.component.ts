import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
const AUTH_API = 'http://localhost:8080/';
@Component({
  selector: 'app-location-nodes',
  templateUrl: './location-nodes.component.html',
  styleUrls: ['./location-nodes.component.scss'],
})
export class LocationNodesComponent implements OnInit {
  nodeDistribution: NodeDistribution[];
  error: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private locationNodeService: LocationNodesService
  ) { }

  ngOnInit(): void {
    this.getNodeDistribution();
  }

  public getNodeDistribution() {
    this.locationNodeService
      .getNodeDistributionByLocation().then(e => this.nodeDistribution = e);

    //return this.nodeDistribution;
  }

  public getNodesContainingName(keyword: string) {
    this.error = '';
    this.nodeDistribution = [];
    console.log(keyword)
    if (keyword) {
      this.locationNodeService
        .getLocationContainingName(keyword).then(e => this.nodeDistribution = e)

      if (Array.isArray(this.nodeDistribution) && this.nodeDistribution.length) {
        this.error = `La localidad ${keyword} no existe`;
      }
      return this.nodeDistribution;
    }
  }
}
