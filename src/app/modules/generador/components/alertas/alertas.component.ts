import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  condiciones,
  EConditions,
  ESteperType,
  IAlertas,
  ICondiciones,
  IFamilyCard,
  IGruposFicha,
  IOptionsRule,
  IOptionsSelect,
  IOptionsVisibility,
  IOptionsVisibilityExtended,
  ISteperValues,
  tipoAlertas,
  TipoDataForm,
  TipoForm
} from '../../interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputsService } from '../../services/inputs.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  @Input() tipoAlerta!: tipoAlertas;
  @Input() indice: number = 0;
  @Input() public formularioGenerado!: IFamilyCard;
  @Input() public grupos: IGruposFicha[] = [];
  @Input() public version?: string;
  @Input() public tipoCards!: {
    tipo: TipoDataForm;
    nombre: TipoForm;
    tituloTexto: string;
    text: string;
  }[];

  @Output() reglaEmitter: EventEmitter<IOptionsVisibilityExtended[]> =
    new EventEmitter();

  public formulario: FormGroup;
  public alertas: IAlertas[] = [];
  public tipoCampo: ESteperType = ESteperType.Text;
  public regla!: IOptionsVisibility;
  public reglaUnitaria: IOptionsVisibilityExtended = {
    indice: 0,
    columnDepend: '',
    rule: EConditions.IGUAL_QUE,
    value: '',
    labelCondition: '',
    labelField: '',
    labelValue: '',
    alertaId: 0,
    tipoAlerta: 'grupal'
  };
  public reglasCondicionales: IOptionsVisibilityExtended[] = [];
  public typesOptions: string[] = [
    ESteperType.SelectFilter,
    ESteperType.SelectMultiple,
    ESteperType.Select,
    ESteperType.SelectDependiente
  ];

  public typesChecks: string[] = [ESteperType.Check, ESteperType.CheckSiNo];

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
    const campoSeleccionado = this.camposVisibles.find(
      campo => campo.columnName === this.formulario.value.campo
    );
    return campoSeleccionado?.options || [];
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

  public get camposVisibles(): ISteperValues[] {
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

  get verCamposVisibles(): any {
    const opciones = this.camposVisibles.find(
      campo => campo.columnName === this.formulario.get('campo')?.value
    );
    return opciones;
  }

  constructor(
    private inputsService: InputsService,
    private alertasService: AlertasService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      alertaId: ['', Validators.required],
      fichaTipoVisible: ['', Validators.required],
      grupoVisible: ['', Validators.required],
      condicion: ['', Validators.required],
      valorCondicion: ['', Validators.required],
      campo: ['', Validators.required],

      campoVisible: [''],
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

    this.formulario.valueChanges.subscribe(formulario => {
      this.reglaUnitaria = {
        columnDepend: formulario.campo.toString(),
        rule: formulario.condicion as EConditions,
        value: formulario.valorCondicion,
        labelCondition: '',
        labelField: '',
        indice: this.indice,
        alertaId: 0,
        tipoAlerta: this.tipoAlerta
      };
    });

    this.cargarAlertas();

    setTimeout(() => {
      this.cargarGrupos();
    }, 300);
  }

  private cargarAlertas(): void {
    this.alertasService.obtenerAlertas().subscribe(respuesta => {
      this.alertas = respuesta;
    });
  }

  public agregarCondicion(): void {
    if (this.formulario.invalid) {
      alert('invalido');
      this.formulario.markAllAsTouched();
      return;
    }

    this.reglasCondicionales.push({
      columnDepend: this.reglaUnitaria.columnDepend,
      rule: this.reglaUnitaria.rule,
      value: this.reglaUnitaria.value,
      labelField: this.obtenerTextoPorId('campo'),
      labelCondition: this.obtenerTextoPorId('condicion'),
      labelValue: this.obtenerTextoPorId('valorCondicion'),
      indice: this.indice,
      tipoAlerta: this.tipoAlerta,
      alertaId: Number(this.formulario.get('alertaId')?.value)
    });
    console.log(this.reglasCondicionales);
    this.reglaEmitter.emit(this.reglasCondicionales);
  }

  public guardarVisibilidad(): void {
    this.formulario;
  }

  private obtenerTextoPorId(id: string): string {
    const selectElement = document.getElementById(id) as HTMLSelectElement;
    if (selectElement && selectElement.tagName === 'SELECT') {
      const selectedText =
        selectElement.options[selectElement.selectedIndex].text;
      return selectedText;
    }
    return '';
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
    this.formulario.patchValue({
      fichaTipoVisible:
        this.tipoAlerta === 'grupal' ? 'grupalNombre' : 'individualNombre'
    });
  }

  public eliminarRegla(indice: number): void {
    this.reglasCondicionales.splice(indice, 1);
    this.reglaEmitter.emit(this.reglasCondicionales);
  }
}
