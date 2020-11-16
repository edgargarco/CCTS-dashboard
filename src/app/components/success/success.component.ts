import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    const numbers = timer(4000);
    numbers.subscribe((x) => {
      this.router.navigate(['/dashboard'])
    });
  }

}
