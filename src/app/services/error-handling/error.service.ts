import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomResponseObjectDTO } from 'src/app/DTOs/custom-response-object-DTO';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error: string;
  constructor( private router: Router,) { }

  handleStatusError(temp:any,redirect:string):string{
    temp.subscribe((e) => {
      if (e.status === 200) {
        this.router.navigateByUrl(redirect);
      } else {
        this.error = JSON.stringify(e.result.toString());
      }
      
    });
    return this.error;

  }
   
}
