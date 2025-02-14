import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  condiciones,
  EConditions,
  ESteperType,
  IAlert,
  ICondiciones,
  IFamilyCard,
  IGruposFicha,
  IOptionsRule,
  IOptionsSelect,
  IOptionsVisibility,
  TipoDataForm,
  TipoForm
} from '../../interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputsService } from '../../services/inputs.service';

type tipoAlertas = 'individual' | 'grupal';
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  public formulario: FormGroup;
  public tipoCampo: ESteperType = ESteperType.Text;
  public regla!: IOptionsVisibility;
  public reglaUnitaria: IOptionsRule = {
    columnDepend: '',
    rule: EConditions.IGUAL_QUE,
    value: ''
  };

  public typesOptions: string[] = [
    ESteperType.SelectFilter,
    ESteperType.SelectMultiple,
    ESteperType.Select,
    ESteperType.SelectDependiente,
    ESteperType.Check,
    ESteperType.CheckSiNo
  ];

  @Input() tipoAlerta!: tipoAlertas;
  @Input() public formularioGenerado!: IFamilyCard;
  @Input() public grupos: IGruposFicha[] = [];
  @Input() public version?: string;
  @Input() public tipoCards!: {
    tipo: TipoDataForm;
    nombre: TipoForm;
    tituloTexto: string;
    text: string;
  }[];

  @Output() reglaEmitter: EventEmitter<IOptionsVisibility> = new EventEmitter();

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
    return (
      this.camposVisibles.find(
        campo => campo.columnName === this.formulario.value.campo
      )?.options || []
    );
  }

  public get reglas(): IOptionsRule[] {
    return this.regla?.rules || [];
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

  constructor(private inputsService: InputsService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      fichaTipoVisible: ['', Validators.required],
      grupoVisible: ['', Validators.required],
      campoVisible: ['', Validators.required],
      condicion: ['', Validators.required],
      valorCondicion: ['', Validators.required],
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
    console.log({ campo });
    if (campo) {
      campo.valueChanges.subscribe(value => {
        this.tipoCampo = this.validarTipoDato(value);
      });
    }

    this.formulario.valueChanges.subscribe(formulario => {
      this.reglaUnitaria = {
        columnDepend: formulario.campo.toString(),
        rule: formulario.condicion as EConditions,
        value: formulario.valorCondicion
      };
    });
  }

  public agregarCondicion(): void {
    if (!this.regla) {
      this.regla = {
        isDepent: true,
        rules: [],
        isShow: true
      };
    }
    this.regla?.rules?.push(this.reglaUnitaria);
    this.reglaEmitter.emit(this.regla);
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
    let rule: EConditions;
    let value;
    if (this.tipoCampo === ESteperType.Calendar) {
      value = {
        minAnnos: Number(this.formulario.value.rango_inicio),
        maximoAnos: Number(this.formulario.value.rango_fin)
      };
      rule = EConditions.RANGO_FECHA;
    } else {
      value = '';
      rule = EConditions.IGUAL_QUE;
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
