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
  ) {}

  ngOnInit(): void {
    this.getNodeDistribution();
  }

  public getNodeDistribution() {
    this.locationNodeService
      .getNodeDistributionByLocation()
      .forEach((element) => {
        this.nodeDistribution = element;
      });
    return this.nodeDistribution;
  }

  public async getNodesContainingName(keyword: string) {
    this.error = '';
    this.nodeDistribution = [];
    if (keyword) {
      await this.locationNodeService
        .getLocationContainingName(keyword)
        .forEach((element) => {
          this.nodeDistribution = element;
        });

      if (
        this.nodeDistribution === undefined ||
        this.nodeDistribution.length == 0
      ) {
        this.error = `La localidad ${keyword} no existe`;
      }
      return this.nodeDistribution;
    }
  }
}
