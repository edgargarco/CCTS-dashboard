import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infected-users',
  templateUrl: './infected-users.component.html',
  styleUrls: ['./infected-users.component.scss']
})
export class InfectedUsersComponent implements OnInit {
  state = true;
  error: string;
  constructor() { }

  ngOnInit(): void {
  }

}
