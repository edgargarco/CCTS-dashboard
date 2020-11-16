import { Component, OnInit } from '@angular/core';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { LocalityByNameIdDTO } from 'src/app/DTOs/locality-name-id';
import { RealTimeSearch } from 'src/app/DTOs/RealTimeSearch/real-time-search';
import { LocationNodeDetails } from 'src/app/DTOs/location-node-details';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-node-registration',
  templateUrl: './node-registration.component.html',
  styleUrls: ['./node-registration.component.scss'],
})
export class NodeRegistrationComponent implements OnInit {
  locationList: LocalityByNameIdDTO[];
  realTimeSearch:RealTimeSearch;
  locality:LocationNodeDetails;
  myForm: FormGroup;
  error:any;
  componentName = 'Localidad';
  constructor(private locationService: LocationNodesService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
   this.bootstrapForm();
  }
  bootstrapForm(){
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nodeDescription:['',[Validators.required,Validators.minLength(3)]]
    })
  }
  receiveMessage($event){
    this.realTimeSearch = $event;
    this.findByNameAndEmailAndId(this.realTimeSearch)
  }

  findByNameAndEmailAndId(element:RealTimeSearch){
    this.locationService.findByNameAndEmailAndId(element).toPromise().then(
      (e) =>{
        this.locality = e.result;
        if(this.locality === null){
          this.myForm.get('email').setValue(''); 
          this.myForm.get('name').setValue(''); 
        }else{
          this.myForm.get('email').setValue(this.locality.email); 
          this.myForm.get('name').setValue(this.locality.name); 
        }
    });
    
  }
  onSubmit(){
    this.locationService.createNodesInLocality(this.myForm.getRawValue()).toPromise().then(
      e => {
        if (e.status === 200) {
          this.router.navigateByUrl('dashboard/success');
        } else {
          this.error = JSON.stringify(e.result.toString());
        }
      }
    )
  }

  get nodeDescription() {
    return this.myForm.get('nodeDescription');
  }

}
