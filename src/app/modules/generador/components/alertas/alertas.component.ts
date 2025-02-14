import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IAlert,
  IFamilyCard,
  IOptionsSelect,
  TipoDataForm
} from '../../interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type tipoAlertas = 'individual' | 'grupal';
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  public alertas: IAlert[] = [];
  public formulario: FormGroup;

  @Input() tipoAlerta!: tipoAlertas;
  @Input() formularioGenerado!: IFamilyCard;

  @Output() alertasEmitidas = new EventEmitter<IAlert[]>();

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      fichaTipoVisible: ['', Validators.required],
      grupo: ['', Validators.required],
      campoVisible: ['', Validators.required],
      condicion: ['', Validators.required],
      valor: ['', Validators.required],
      campo: ['', Validators.required],

      rango_inicio: [''],
      rango_fin: ['']
    });
  }

  public mostrarAlerta(alerta: IAlert): void {
    console.log('Alerta activada:', alerta);
  }

  ngOnInit() {
    if (this.tipoAlerta === 'grupal') {
      this.alertas = this.formularioGenerado.alertaGrupal;
    } else if (this.tipoAlerta === 'individual') {
      this.alertas = this.formularioGenerado.alertaIndividual;
    }
  }

  public guardarAlerta(): void {
    this.alertasEmitidas.emit(this.alertas);
  }

  public get tipoData(): {
    grupalNombre: TipoDataForm;
    individualNombre: TipoDataForm;
  } {
    return {
      grupalNombre: 'grupalData',
      individualNombre: 'individualData'
    };
  }

  public get opciones(): IOptionsSelect[] {
    return [];
    //return (
    //  this.camposVisibles.find(
    //    campo => campo.columnName === this.formulario.value.campo
    //  )?.options || []
    //);
  }

  public get camposVisibles(): any[] {
    //try {
    //  if (this.formulario.value.fichaTipoVisible === '') {
    //    return [];
    //  }
    //
    //  let fichaTipo!: 'grupalData' | 'individualData';
    //  switch (this.formulario.value.fichaTipoVisible) {
    //    case 'individualNombre':
    //      fichaTipo = 'individualData';
    //      break;
    //    case 'grupalNombre':
    //      fichaTipo = 'grupalData';
    //      break;
    //  }
    //
    //  return (
    //    this.formularioGenerado[fichaTipo].find(
    //      (form: any) => form.id === Number(this.formulario.value.grupoVisible)
    //    )?.values || []
    //  );
    //} catch (error) {
    //  return [];
    //}
    return [];
  }
}
