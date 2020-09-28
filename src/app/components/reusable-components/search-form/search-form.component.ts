import { Component, OnInit, Input } from '@angular/core';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() title:string;
  @Input() component:string;
  @Input() maskAux:string;
  nodeDistribution: NodeDistribution[];
  error: string;
  state: boolean;
  constructor(private locationNodeService: LocationNodesService) { }

  ngOnInit(): void {
    console.log(this.maskAux)
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
  }

}
