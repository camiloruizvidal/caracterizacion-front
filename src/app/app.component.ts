import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
