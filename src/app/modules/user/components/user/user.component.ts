import { UsersService } from './../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDocumentType, IRols, IUser } from '../../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public userForm: FormGroup;
  public roles: IRols[] = [];
  public documentosTipos: IDocumentType[] = [];

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombrePrimero: ['', Validators.required],
      nombreSegundo: [''],
      apellidoPrimero: ['', Validators.required],
      apellidoSegundo: [''],
      documento: ['', Validators.required],
      documentoTipoId: ['', Validators.required],
      rolId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRols();
    this.loadDocumentsTypes();
  }

  private loadRols(): void {
    this.usersService.getRols().subscribe((roles: IRols[]) => {
      this.roles = roles;
    });
  }

  private loadDocumentsTypes(): void {
    this.usersService.getDocumentsTypes().subscribe((documentosTipos: IDocumentType[]) => {
      this.documentosTipos = documentosTipos;
    });
  }

  public onSubmit() {
    if (this.userForm.valid) {
      const userData: IUser = { ...this.userForm.value };
      this.usersService.createUser(userData).subscribe(
        (response) => {
          console.log('Usuario creado exitosamente', response);
        },
        (error: any) => {
          console.error('Error al crear el usuario', error);
        }
      );
    }
  }
}
