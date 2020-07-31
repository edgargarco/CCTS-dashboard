import { Component, OnInit } from '@angular/core';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { NodeDistribution } from 'src/app/DTOs/node-distribution';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalityDTO } from 'src/app/DTOs/locality-dto';
import { Address } from 'src/app/classes/Address';
import { GpsLocation } from 'src/app/classes/gps-location';
import { ErrorService } from 'src/app/services/error-handling/error.service';

@Component({
  selector: 'app-register-location',
  templateUrl: './register-location.component.html',
  styleUrls: ['./register-location.component.scss']
})
export class RegisterLocationComponent implements OnInit {
  nodeDistribution: NodeDistribution[];
  error: string;
  state: boolean;
  latitudeAux = 18.7357;
  longitudeAux = -70.1627;
  mapType = 'roadmap';
  mapOptions = { zoom: 8 }
  styles: any;
  selectedLatitude:number;
  selectedLongitude:number;
  myForm: FormGroup;
  locality:LocalityDTO;

  constructor( private locationNodeService: LocationNodesService, 
    private formBuilder: FormBuilder,private errorService:ErrorService) 
  {this.bootstrapForm() }

  ngOnInit(): void {
    this.bootstrapForm();
  }
 

  bootstrapForm(){
    this.myForm = this.formBuilder.group({
      cellPhone: ['', [Validators.required,Validators.minLength(10)]],
      name: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      direction: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.minLength(2)]],
      latitude: [{value:'',disabled:true}, [  Validators.minLength(2)]],
      longitude: ['', [  Validators.minLength(2)]],
      type:['', [ Validators.required, Validators.minLength(2)]],
    })
  }
  onSubmit(){
      let temp:any
      this.locality = this.myForm.getRawValue();
      this.locality.latitude =  this.selectedLatitude;
      this.locality.longitude =  this.selectedLongitude;
      // eslint-disable-next-line prefer-const
      temp = this.locationNodeService.createNewLocation(this.locality);
      this.error = this.errorService.handleStatusError(temp,'dashboard/success');
 }

  placeMarker($event){
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.selectedLatitude = ($event.coords.lat);
   this.selectedLongitude = ($event.coords.lng);
  }
  initMapStyles() {
    this.styles = [
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      }
    ]
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
  get name() {
    return this.myForm.get('name');
  }
  get email() {
    return this.myForm.get('email');
  }
  get direction() {
    return this.myForm.get('direction');
  }
  get city() {
    return this.myForm.get('city');
  }
  get postalCode() {
    return this.myForm.get('postalCode');
  }
  get latitude() {
    return this.myForm.get('latitude');
  }
  get longitude() {
    return this.myForm.get('longitude');
  }
  get type(){
    return this.myForm.get('type');
  }


}
