import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Sistema de caracterización ESE Popayán';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  getActiveClass(name: string) {
    const path = this.activatedRoute.firstChild?.snapshot?.routeConfig?.path;
    return path === name ? 'active' : '';
  }

  public cerrarSesion(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  public get nombres(): string {
    const nombres: any = JSON.parse(localStorage.getItem('user') ?? '');
    return `${nombres.nombrePrimero} ${nombres.apellidoPrimero}`;
  }

  public get isShow(): boolean {
    return location.pathname !== '/login';
  }
}
