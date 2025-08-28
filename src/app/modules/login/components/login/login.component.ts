import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'enviroment/enviroment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public isLoading: boolean = false;
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      // Limpiar mensaje de error previo y activar loading
      this.errorMessage = '';
      this.isLoading = true;
      
      this.loginService.loguearse(this.loginForm.value).subscribe(
        (response: any) => {
          // En caso de éxito, mantener el loading hasta que se navegue
          // (no desbloquear el botón)
          localStorage.setItem('token', response?.user?.token);
          localStorage.setItem('user', JSON.stringify(response?.user));
          this.router.navigate(['/']);
        },
        error => {
          // Solo desbloquear el botón en caso de error y mostrar mensaje
          this.isLoading = false;
          this.errorMessage = 'El usuario o contraseña son incorrectos';
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
