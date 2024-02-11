import { UsersService } from '../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDocumentType, IRols, IUser } from '../../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class UserComponent implements OnInit {
  public userForm: FormGroup;
  public roles: IRols[] = [];
  public documentosTipos: IDocumentType[] = [];

  public get esCaracterizador(): boolean {
    const controlInicio = this.userForm.get('codigoInicial');
    const controlFin = this.userForm.get('codigoFinal');

    const isRequired: boolean = Number(this.userForm.value['rolId']) === 2;

    if (isRequired) {
      controlInicio?.setValidators([Validators.required]);
      controlFin?.setValidators([Validators.required]);
    } else {
      controlInicio?.clearValidators();
      controlFin?.clearValidators();
    }

    controlInicio?.updateValueAndValidity();
    controlFin?.updateValueAndValidity();

    return isRequired;
  }

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(6)]],
      nombrePrimero: ['', Validators.required],
      nombreSegundo: [''],
      apellidoPrimero: ['', Validators.required],
      apellidoSegundo: [''],
      documento: ['', Validators.required],
      documentoTipoId: ['', Validators.required],
      rolId: ['', Validators.required],
      codigoInicial: [''],
      codigoFinal: [''],
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
    this.usersService
      .getDocumentsTypes()
      .subscribe((documentosTipos: IDocumentType[]) => {
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

  public isInvalidInput(name: string): boolean {
    return (
      this.userForm.get(name)?.hasError('required') &&
      this.userForm.get(name)?.touched
    ) || false;
  }
}
