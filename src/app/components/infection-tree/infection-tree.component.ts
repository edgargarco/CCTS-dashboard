import { Component, OnInit } from '@angular/core';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';
import { UserService } from 'src/app/services/user-services/user.service';
import { ServiceService } from 'src/app/services/health/service.service';
import { ActivatedRoute } from '@angular/router';
import { Infected } from 'src/app/DTOs/infected';
import { infectedDetail } from 'src/app/DTOs/infectedDetail';

@Component({
  selector: 'app-infection-tree',
  templateUrl: './infection-tree.component.html',
  styleUrls: ['./infection-tree.component.scss']
})
export class InfectionTreeComponent implements OnInit {
  nodeDistribution: NodeDistribution[];
  infected: infectedDetail[];
  constructor(private healthService:ServiceService,private route:ActivatedRoute,private locationNodeService: LocationNodesService,private userService:UserService) { }

  ngOnInit(): void {
    this.kNearestInfected();
 
  }
  async kNearestInfected(){
    await this.healthService.kNearestInfectors(+this.route.snapshot.paramMap.get('id')).toPromise().then(
        e => this.infected = e.result
    )
  }
 
  

}
