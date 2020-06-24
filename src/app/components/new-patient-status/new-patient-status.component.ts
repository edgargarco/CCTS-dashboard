import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-patient-status',
  templateUrl: './new-patient-status.component.html',
  styleUrls: ['./new-patient-status.component.scss'],
})
export class NewPatientStatusComponent implements OnInit {
  componentName = 'Registro de nuevo estado de salud';
  constructor() {}

  ngOnInit(): void {}
}
