import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDocumentType, IRols, IUserDetail } from '../../../interface/user';
import { UsersService } from '../../../services/user/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() user!: IUserDetail;
  @Output() userDataEmitter: EventEmitter<IUserDetail> = new EventEmitter();
  public userForm: FormGroup;
  public roles: IRols[] = [];
  public documentosTipos: IDocumentType[] = [];
  public isSaved: Boolean = false;
  public isCreate: boolean = true;

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

    controlFin?.clearValidators();
    controlFin?.updateValueAndValidity();

    controlInicio?.clearValidators();
    controlInicio?.updateValueAndValidity();

    return isRequired;
  }

  public get siMostrarReiniciarContrasenna(): boolean {
    return this.user !== undefined;
  }

  public get isDisabledSave(): boolean {
    return this.userForm.errors !== null;
  }

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
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
      inactivo: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRols();
    this.loadDocumentsTypes();
    this.loadUser();
  }

  public onInactivoChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value === 'true';
    this.userForm.get('inactivo')?.setValue(value);
  }

  private loadUser(): void {
    if (this.user) {
      this.isCreate = false;
      const passwordControl = this.userForm.controls['password'];
      const passwordRepeatControl = this.userForm.controls['passwordRepeat'];
      const codigoInicialControl = this.userForm.controls['codigoInicial'];
      const codigoFinalControl = this.userForm.controls['codigoFinal'];

      if (codigoInicialControl) {
        codigoInicialControl.clearValidators();
        codigoInicialControl.updateValueAndValidity();
      }

      if (codigoFinalControl) {
        codigoFinalControl.clearValidators();
        codigoFinalControl.updateValueAndValidity();
      }

      if (passwordControl) {
        passwordControl.clearValidators();
        passwordControl.updateValueAndValidity();
      }

      if (passwordRepeatControl) {
        passwordRepeatControl.clearValidators();
        passwordRepeatControl.updateValueAndValidity();
      }
      this.userForm.patchValue(this.user);
    }
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
      this.isSaved = true;
      const userData: IUserDetail = {
        username: this.userForm.get('documento')?.value,
        ...this.userForm.value
      };
      this.userDataEmitter.emit(userData);
    }
  }

  public isInvalidInput(name: string): boolean {
    return (
      (this.userForm.get(name)?.hasError('required') &&
        this.userForm.get(name)?.touched) ||
      false
    );
  }

  public abrirModal(content: any): void {
    this.modalService.open(content, { centered: true });
  }

  public reiniciarContrasenna(): void {
    this.usersService
      .reinciarContrasennaAdmin(this.user.id)
      .subscribe(response => {
        this.toastr.success('Se cambio la contraseña exitosamente', 'Cambiada');
      });
  }
}
