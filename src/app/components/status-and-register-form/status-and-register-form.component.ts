import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterEventsService } from 'src/app/services/router-events/router-events.service';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/countries/country.service';
import { CountryDTO } from 'src/app/DTOs/countryDTO';
import { UserService } from 'src/app/services/user-services/user.service';
import { PatientDetails } from 'src/app/DTOs/patient-details';
 
import { PatientUpdateDTO } from 'src/app/DTOs/patiend-update-DTO';
import { ErrorService } from 'src/app/services/error-handling/error.service';

@Component({
  selector: 'app-status-and-register-form',
  templateUrl: './status-and-register-form.component.html',
  styleUrls: ['./status-and-register-form.component.scss'],
})
export class StatusAndRegisterFormComponent implements OnInit {
  @Input() componentName: string;
  myForm: FormGroup;
  countriesList: CountryDTO[];
  isRegistration: boolean;
  patient: PatientDetails;
  patientToUpdate: PatientUpdateDTO;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private routerService: RouterEventsService,
    private countryService: CountryService,
    private userservice: UserService,
    private errorService:ErrorService

  ) {
    this.bootstrapForm();
  }

  ngOnInit(): void {
    this.bootstrapForm();
    this.getCountryList();
  }

  routerEventHandling() {
    return this.routerService.routerEvent(this.router);
  }

  getPatientByIdentifier( ) {
    this.userservice
      .getPatientByIdentifier(this.myForm.get('id').value)
      .then((e) => {
        this.error = '';
        this.patient = new PatientDetails();
        if (e.status != 200) {
          this.error = (e.result);
        } 
        if(this.error === ''){
          this.patient = e.result;
        }
        
      })
      ;
  }

  bootstrapForm() {
    if (this.routerEventHandling() == '/dashboard/register-user') {
      this.myForm = this.formBuilder.group({
        id: ['', [Validators.required]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        direction: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        postalCode: ['', [Validators.required, Validators.minLength(2)]],
        occupation: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', [Validators.required, Validators.minLength(2)]],
        age: ['', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.required, Validators.email]],
      });

      this.isRegistration = true;
    } else if (this.routerEventHandling() == '/dashboard/covid-test') {
      this.isRegistration = false;

      this.myForm = this.formBuilder.group({
        id: ['', [Validators.required]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        direction: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        postalCode: ['', [Validators.required, Validators.minLength(2)]],
        occupation: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', [Validators.required, Validators.minLength(2)]],
        age: ['', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.required, Validators.email]],
        status: ['', [Validators.required]],
        fever: ['', [Validators.required]],
        cough: ['', [Validators.required]],
        breathDifficulty: ['', [Validators.required]],
        soreThroat: ['', [Validators.required]],
        smellLoss: ['', [Validators.required]],
        tasteLoss: ['', [Validators.required]],
      });
      this.setDisable();
    }
  }

  setDisable() {
    this.myForm.get('firstName').disable();
    this.myForm.get('lastName').disable();
    this.myForm.get('direction').disable();
    this.myForm.get('city').disable();
    this.myForm.get('postalCode').disable();
    this.myForm.get('occupation').disable();
    this.myForm.get('country').disable();
    this.myForm.get('age').disable();
    this.myForm.get('email').disable();
  }
  getCountryList() {
    this.countriesList = this.countryService.getCountries();
  }
  onSubmit() {
    let temp: any;
    if (this.routerEventHandling() === '/dashboard/register-user') {
      this.patient = this.myForm.value;
      temp = this.userservice.createNewUser(this.patient);
    } else if (this.routerEventHandling() === '/dashboard/covid-test') {
      this.patientToUpdate = this.myForm.value;
      temp = this.userservice.updatePatientStatus(this.patientToUpdate);
    }
    this.error = this.errorService.handleStatusError(temp,'dashboard/success');
   
  }

  get firstName() {
    return this.myForm.get('firstName');
  }
  get lastName() {
    return this.myForm.get('lastName');
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
  get occupation() {
    return this.myForm.get('occupation');
  }
  get country() {
    return this.myForm.get('country');
  }
  get age() {
    return this.myForm.get('age');
  }
  get email() {
    return this.myForm.get('email');
  }
  get status() {
    return this.myForm.get('status');
  }
  get fever() {
    return this.myForm.get('fever');
  }
  get cough() {
    return this.myForm.get('cough');
  }
  get soreThroat() {
    return this.myForm.get('soreThroat');
  }
  get smellLoss() {
    return this.myForm.get('smellLoss');
  }
  get tasteLoss() {
    return this.myForm.get('tasteLoss');
  }
  get breathDificulty() {
    return this.myForm.get('breathDifficulty');
  }
}
