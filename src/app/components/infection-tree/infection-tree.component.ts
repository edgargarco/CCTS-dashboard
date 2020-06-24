import { Component, OnInit } from '@angular/core';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';

@Component({
  selector: 'app-infection-tree',
  templateUrl: './infection-tree.component.html',
  styleUrls: ['./infection-tree.component.scss']
})
export class InfectionTreeComponent implements OnInit {
  nodeDistribution: NodeDistribution[];
  constructor(private locationNodeService: LocationNodesService) { }

  ngOnInit(): void {
    //this.getNodeDistribution();
  }
  // public getNodeDistribution() {
  //   this.locationNodeService
  //     .getNodeDistributionByLocation()
  //     .forEach((element) => {
  //       this.nodeDistribution = element;
  //     });
  //   return this.nodeDistribution;
  // }

}
