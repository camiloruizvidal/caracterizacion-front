import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Sistema de caracterización ESE Popayán';

  constructor(private router: Router) {}

  public getActiveClass(name: string): string {
    return '';
  }
}
