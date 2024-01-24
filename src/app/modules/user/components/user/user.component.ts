import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombrePrimero: ['', Validators.required],
      nombreSegundo: [''],
      apellidoPrimero: ['', Validators.required],
      apellidoSegundo: [''],
      documento: ['', Validators.required],
      documentoTipoId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {/*
      const userData: IUser = { ...this.userForm.value };
      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('Usuario creado exitosamente', response);
        },
        (error: any) => {
          console.error('Error al crear el usuario', error);
        }
      );*/
    }
  }
}
