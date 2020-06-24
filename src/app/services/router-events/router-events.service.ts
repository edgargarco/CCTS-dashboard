import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterEventsService {
  tempUrl: string;
  constructor(private router: Router) {}
  public routerEvent(router: Router) {
    return router.url;
  }
}
