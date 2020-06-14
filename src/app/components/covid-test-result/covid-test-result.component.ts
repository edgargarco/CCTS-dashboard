import { Component, OnInit } from '@angular/core';
import { TestResultService } from 'src/app/services/test-result/test-result.service';
import { ThrowStmt } from '@angular/compiler';
import { PatientDetails } from 'src/app/DTOs/patient-details';
import { PatientUpdateDTO } from 'src/app/DTOs/patiend-update-DTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-covid-test-result',
  templateUrl: './covid-test-result.component.html',
  styleUrls: ['./covid-test-result.component.scss'],
})
export class CovidTestResultComponent implements OnInit {
  patient: PatientDetails;
  status: string;
  error: string;
  constructor(
    private testResultService: TestResultService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  public getPatientByIdentifier(id: string) {
    this.patient = undefined;
    if (id) {
      this.testResultService.getPatientByIdentifier(id).subscribe((element) => {
        this.patient = element;
      });
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
      let patient = new PatientUpdateDTO(
        id,
        status,
        fever,
        cough,
        breathDifficulty,
        soreThroat,
        smellLoss,
        tasteLoss
      );
      let temp = this.testResultService.updatePatientStatus(patient);
      temp.subscribe((e) => {
        if (e.status === 200) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.error = JSON.stringify(e.result.toString());
        }
        console.log(e);
      });
    } else {
      this.error =
        'Formulario Incompleto, revise los datos ingresados en el formulario';
    }
  }
}
