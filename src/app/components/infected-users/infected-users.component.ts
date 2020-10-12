import { Component, OnInit } from '@angular/core';
import { Infected } from 'src/app/DTOs/infected';
import { ServiceService } from 'src/app/services/health/service.service';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-infected-users',
  templateUrl: './infected-users.component.html',
  styleUrls: ['./infected-users.component.scss']
})
export class InfectedUsersComponent implements OnInit {
  state = true;
  error: string;
  userAmount = 5;
  page = 1;
  pageNumber:number;
  pageChange:number;
  infected:Infected[];
  constructor(private userService:UserService,private healthStatusService:ServiceService) { }

  ngOnInit(): void {
    this.getInfectedUsers(this.page);
    this.healthStatusService.getCount().toPromise().then(e => {
      this.pageNumber = Math.ceil((e.result)/this.userAmount)
    })
  }
  async getInfectedUsers(page){
    await  this.userService.getInfectedUsers(page).toPromise().then(e => this.infected = e.result);
  }

  getEvent($event){
    this.getInfectedUsers($event);
  }


}
