import {
  condiciones,
  ICondiciones
} from './../../../../../../../caracterizacion-back/src/utils/global.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ESteperType,
  IFamilyCard,
  IGruposFicha,
  IOptionsVisibility,
  TipoDataForm,
  TipoForm,
  typeRule
} from '../../interfaces/interface';
import { InputsService } from '../../services/inputs.service';

@Component({
  selector: 'app-is-visible',
  templateUrl: './is-visible.component.html',
  styleUrls: ['./is-visible.component.scss']
})
export class IsVisibleComponent implements OnInit {
  public formulario: FormGroup;
  public tipoCampo: ESteperType = ESteperType.Text;
  public regla!: IOptionsVisibility;

  @Input() public formularioGenerado!: IFamilyCard;
  @Input() public grupos: IGruposFicha[] = [];
  @Input() public version?: string;
  @Input() public tipoCards!: {
    tipo: TipoDataForm;
    nombre: TipoForm;
    tituloTexto: string;
    text: string;
  }[];

  constructor(private inputsService: InputsService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      fichaTipoVisible: ['', Validators.required],
      grupoVisible: ['', Validators.required],
      campoVisible: ['', Validators.required],
      condicion: ['', Validators.required],
      campo: ['', Validators.required],

      rango_inicio: [''],
      rango_fin: ['']
    });
  }

  ngOnInit(): void {
    const rangoInicioControl = this.formulario.get('rango_inicio');
    if (rangoInicioControl) {
      rangoInicioControl.valueChanges.subscribe(value => {
        this.filtrarCampos();
      });
    }

    const rangoFinControl = this.formulario.get('rango_fin');
    if (rangoFinControl) {
      rangoFinControl.valueChanges.subscribe(value => {
        this.filtrarCampos();
      });
    }
    const campo = this.formulario.get('campo');
    if (campo) {
      campo.valueChanges.subscribe(value => {
        this.tipoCampo = this.validarTipoDato(value);
      });
    }
  }

  public get gruposVisiblesFiltrado(): any[] {
    switch (this.formulario.value.fichaTipoVisible) {
      case 'individualNombre':
        return this.formularioGenerado.individualData;
      case 'grupalNombre':
        return this.formularioGenerado.grupalData;
      default:
        return [];
    }
  }

  public get condiciones(): ICondiciones[] {
    return condiciones;
  }

  public get camposVisibles(): any[] {
    try {
      if (this.formulario.value.fichaTipoVisible === '') {
        return [];
      }

      let fichaTipo!: 'grupalData' | 'individualData';
      switch (this.formulario.value.fichaTipoVisible) {
        case 'individualNombre':
          fichaTipo = 'individualData';
          break;
        case 'grupalNombre':
          fichaTipo = 'grupalData';
          break;
      }

      return (
        this.formularioGenerado[fichaTipo].find(
          (form: any) => form.id === Number(this.formulario.value.grupoVisible)
        )?.values || []
      );
    } catch (error) {
      return [];
    }
  }

  public guardarVisibilidad(): void {
    this.formulario;
  }

  private validarTipoDato(columna: string): ESteperType {
    const fichaTipoVisible: any = this.formulario.value.fichaTipoVisible;
    const formularioGenerado: any = this.formularioGenerado;
    let fichaTipo!: 'grupalData' | 'individualData';
    switch (fichaTipoVisible) {
      case 'individualNombre':
        fichaTipo = 'individualData';
        break;
      case 'grupalNombre':
        fichaTipo = 'grupalData';
        break;
    }

    const values = formularioGenerado[fichaTipo].find(
      (form: any) => form.id === Number(this.formulario.value.grupoVisible)
    ).values;

    const item = values.find((item: any) => item.columnName === columna);

    return item.type as ESteperType;
  }

  public filtrarGrupos(target: EventTarget | null) {}

  public filtrarCampos() {
    const columna = this.formulario.value.campo;
    this.tipoCampo = this.validarTipoDato(columna);
    let rule: typeRule;
    let value;
    if (this.tipoCampo === ESteperType.Calendar) {
      value = {
        minAnnos: Number(this.formulario.value.rango_inicio),
        maximoAnos: Number(this.formulario.value.rango_fin)
      };
      rule = 'rangoFecha';
    } else {
      value = '';
      rule = '=';
    }
    this.regla = {
      isDepent: true,
      rules: [
        {
          rule,
          columnDepend: columna,
          value: JSON.stringify(value)
        }
      ],
      isShow: true
    };
  }

  public cargarGrupos(): void {
    const tipo = this.tipoCards.find(
      tipo => tipo.nombre === this.formulario.value.fichaTipo
    );
    this.inputsService
      .obtenerGruposFichas(Number(this.version), tipo?.tipo)
      .subscribe((result: IGruposFicha[]) => {
        this.grupos = result;
      });
  }
}
