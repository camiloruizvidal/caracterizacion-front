import { Component, Injector } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Sistema de caracterización ESE Popayán';

  constructor(private activatedRoute: ActivatedRoute) {}

  getActiveClass(name: string) {
    const path = this.activatedRoute.firstChild?.snapshot?.routeConfig?.path;
    return path === name ? 'active' : '';
  }
}
