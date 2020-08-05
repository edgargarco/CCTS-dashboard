import { Component, OnInit } from '@angular/core';
import { LocalityByNameIdDTO } from 'src/app/DTOs/locality-name-id';
import { LocationNodesService } from 'src/app/services/location/location-nodes.service';
import { LocalityDTO } from 'src/app/DTOs/locality-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationNodeDetails } from 'src/app/DTOs/location-node-details';
import { UserService } from 'src/app/services/user-services/user.service';
import { Router } from '@angular/router';
import { RealTimeSearch } from 'src/app/DTOs/RealTimeSearch/real-time-search';

@Component({
  selector: 'app-add-admin-locality',
  templateUrl: './add-admin-locality.component.html',
  styleUrls: ['./add-admin-locality.component.scss']
})
export class AddAdminLocalityComponent implements OnInit {
  locationList: LocalityByNameIdDTO[];
  locality:LocationNodeDetails;
  myForm: FormGroup;
  tagSuggestions = [];
  error:string;
  realTimeSearch:RealTimeSearch;
  componentName = 'Institucion';
  constructor(private locationService: LocationNodesService,
    private userService:UserService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.bootstrapForm();
    }
  bootstrapForm(){
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      tag:[this.tagSuggestions,[Validators.required]],
      email: ['', [Validators.required, Validators.email]],

    })
  }
  receiveMessage($event){
    this.realTimeSearch = $event;
    this.findByTypeAndNameAndEmailAndId(this.realTimeSearch)
  }
  findByTypeAndNameAndEmailAndId(element:RealTimeSearch){
    this.locationService.findByTypeAndNameAndEmailAndId(element).toPromise().then(
      (e) => {
        this.locality = e.result;
        if(this.locality === null){
          this.myForm.get('email').setValue(''); 
          this.myForm.get('name').setValue(''); 
        }else{
          this.myForm.get('email').setValue(this.locality.email); 
          this.myForm.get('name').setValue(this.locality.name); 
        }
      }
    );
    this.getUsernames();
  }
  getUsernames(){
    this.userService.getAllNotEmployedAdmins().toPromise().then(
      e => {
        if(e.status === 200){
          this.tagSuggestions = e.result;
        }
      }
    )
  }
  get firstName() {
    return this.myForm.get('name');
  }
  onSubmit(){
    console.log(this.myForm.getRawValue());
    this.locationService.asignUsersToLocality(this.myForm.getRawValue()).toPromise().then(
      e => {
        if (e.status === 200) {
          this.router.navigateByUrl('dashboard/success');
        } else {
          this.error = JSON.stringify(e.result.toString());
        }
      }
    )
  }

}
