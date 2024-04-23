import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: FormGroup;

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
      this.loginService.loguearse(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('user', JSON.stringify(response?.user))
          this.router.navigate(['/']);
        },
        error => {
          this.toastr.error('El usuario o contraseña son incorrectos', 'Error');
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
