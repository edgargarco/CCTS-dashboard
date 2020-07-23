import { Component, OnInit, Input } from '@angular/core';
import { PatientDetails } from 'src/app/DTOs/patient-details';
import { PatientUpdateDTO } from 'src/app/DTOs/patiend-update-DTO';
import {
  Router
} from '@angular/router';
import { UserService } from 'src/app/services/user-services/user.service';
 
@Component({
  selector: 'app-covid-test-result',
  templateUrl: './covid-test-result.component.html',
  styleUrls: ['./covid-test-result.component.scss'],
})
export class CovidTestResultComponent implements OnInit {
  patient: PatientDetails;
  error: string;
  @Input() componentName: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  public getPatientByIdentifier(id: string) {
    this.patient = undefined;
    if (id) {
      this.userService.getPatientByIdentifier(id).then(e => this.patient = e.result);
      return this.patient;
    }
  }

  public setPatiendStatus(
    id: string,
    status: boolean,
    fever: boolean,
    cough: boolean,
    breathDifficulty: boolean,
    soreThroat: boolean,
    smellLoss: boolean,
    tasteLoss: boolean
  ) {
    if (
      id &&
      status &&
      fever &&
      cough &&
      breathDifficulty &&
      soreThroat &&
      smellLoss &&
      tasteLoss
    ) {
      const patient = new PatientUpdateDTO(
        id,
        status,
        fever,
        cough,
        breathDifficulty,
        soreThroat,
        smellLoss,
        tasteLoss
      );
      const temp = this.userService.updatePatientStatus(patient);
      temp.subscribe((e) => {
        if (e.status === 200) {
          this.router.navigateByUrl('/success');
        } else {
          this.error = JSON.stringify(e.result.toString());
        }
      });
    } else {
      this.error =
        'Formulario Incompleto, revise los datos ingresados en el formulario';
    }
  }
}
