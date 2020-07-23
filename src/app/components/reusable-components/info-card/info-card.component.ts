import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {

  @Input() data: number;
  @Input() subject: string;
  @Input() color: string;
  @Input() icon: string;
 
  

}
