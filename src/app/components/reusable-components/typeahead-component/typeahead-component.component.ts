import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { RealTimeSearch } from 'src/app/DTOs/RealTimeSearch/real-time-search';
 
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { RouterEventsService } from 'src/app/services/router-events/router-events.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-services/user.service';

let locations: {name: string, email: string,id:number}[] = []

 
@Component({
  selector: 'app-typeahead-component',
  templateUrl: './typeahead-component.component.html',
  styleUrls: ['./typeahead-component.component.scss']
})
export class TypeaheadComponentComponent implements OnInit {
  myForm: FormGroup;
  model: any;
  realTimeSearch:RealTimeSearch[];
  elementToShare:RealTimeSearch;
  @Output() messageEvent = new EventEmitter<RealTimeSearch>();
  @Input() name:string;
  /**
   * @var user to manage the state depending on route
   * 1 means add user to institution
   * 2 means to create a node 
   */
  @Input() used:number;

  constructor(private formBuilder: FormBuilder,
    private locationService:LocationNodesService,
    private routerService: RouterEventsService,
    private userService: UserService,
    private router:Router) { }

  ngOnInit(): void {}
   performSearch(){
     if(this.elementToShare){
      this.getInstitutionByName(this.elementToShare);
     }
   }
   getInstitutionByName(element:RealTimeSearch){
      this.messageEvent.emit(element);
   }
   routerEventHandling() {
    return this.routerService.routerEvent(this.router);
  }
    getData(name){
      if(this.used === 1){
        this.locationService.realTimeSearchLocality(name).then(e => {
          locations = []
       e.forEach(element => {
         locations.push({name:element.name,email:element.email,id:element.id})
       })
      })
    }else if(this.used === 2){
      this.locationService.realTimeSearchAllLocality(name).then(e => {
        locations = []
     e.forEach(element => {
       locations.push({name:element.name,email:element.email,id:element.id})
     })
    })
  }else if(this.used === 3){
    this.userService.getPersonContainingId(name).then(e => {
      
      locations = []
   e.forEach(element => {
     locations.push({name:element.name,email:element.email,id:element.id})  
   })
  })
}
    return locations;
  }
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      map( term => term === '' ? []
        :   this.getData(term).filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, locations.length))
    )

  formatter = (x: {name: string}) => x.name;
  itemSelected(e:NgbTypeaheadSelectItemEvent) {
    this.elementToShare = e.item;
    this.getInstitutionByName(this.elementToShare);
  }
 
  

}
