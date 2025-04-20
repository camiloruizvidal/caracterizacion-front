import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  condiciones,
  EConditions,
  ETipoPregunta,
  ICondiciones,
  IFormulario,
  ICategoria,
  IOptionsRule,
  IOptionsSelect,
  IOptionsVisibility,
  TipoDataForm,
  TipoForm
} from '../../interfaces/interface';
import { InputsService } from '../../services/inputs.service';
import { IDateCondition } from '../date-condition-selector/date-condition-selector.component';
import { IPregunta } from '../../interfaces/interface';

@Component({
  selector: 'app-is-visible',
  templateUrl: './is-visible.component.html',
  styleUrls: ['./is-visible.component.scss']
})
export class IsVisibleComponent implements OnInit {
  public formulario: FormGroup;
  public tipoCampo: ETipoPregunta = ETipoPregunta.Text;
  public regla!: IOptionsVisibility;
  public reglaUnitaria: IOptionsRule = {
    columnDepend: '',
    rule: EConditions.IGUAL_QUE,
    value: ''
  };

  public calendarConditions: string[] = [];

  public dateCondition: IDateCondition = {
    type: 'relative',
    condition: EConditions.MENOR_QUE
  };

  public typesOptions: string[] = [
    ETipoPregunta.SelectFilter,
    ETipoPregunta.SelectMultiple,
    ETipoPregunta.Select,
    ETipoPregunta.SelectDependiente,
    ETipoPregunta.Check,
    ETipoPregunta.CheckSiNo
  ];

  @Output() reglaEmitter: EventEmitter<IOptionsVisibility> = new EventEmitter();
  @Input() public formularioGenerado!: IFormulario;
  @Input() public grupos: ICategoria[] = [];
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
      valorCondicion: ['', Validators.required],
      campo: ['', Validators.required]
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
        if (this.tipoCampo === ETipoPregunta.Calendar) {
          this.calendarConditions = [];
          this.actualizarReglaCalendario();
        }
      });
    }

    this.formulario.valueChanges.subscribe(formulario => {
      if (this.tipoCampo !== ETipoPregunta.Calendar) {
        this.reglaUnitaria = {
          columnDepend: formulario.campo.toString(),
          rule: formulario.condicion as EConditions,
          value: formulario.valorCondicion
        };
      }
    });
  }

  onDateConditionChange(condition: IDateCondition): void {
    const value: any = {
      type: condition.type
    };

    if (condition.type === 'relative') {
      value.years = condition.years;
      value.months = condition.months;
      value.days = condition.days;

      if (condition.condition === EConditions.RANGO_FECHA) {
        value.endYears = condition.endYears;
        value.endMonths = condition.endMonths;
        value.endDays = condition.endDays;
      }
    } else {
      value.date = condition.absoluteDate;
    }

    const conditionString = JSON.stringify(value);

    this.reglaUnitaria = {
      columnDepend: this.formulario.get('campo')?.value || '',
      rule: EConditions.OR,
      value: conditionString
    };
  }

  public agregarCondicion(): void {
    if (this.tipoCampo === ETipoPregunta.Calendar) {
      if (this.reglaUnitaria.value) {
        this.calendarConditions.push(this.reglaUnitaria.value as string);
        this.actualizarReglaCalendario();
      }
    } else {
      if (!this.regla) {
        this.regla = {
          isDepent: true,
          rules: [],
          isShow: true
        };
      }
      this.regla?.rules?.push(this.reglaUnitaria);
    }
    this.reglaEmitter.emit(this.regla);
  }

  private actualizarReglaCalendario(): void {
    if (!this.regla) {
      this.regla = {
        isDepent: true,
        rules: [],
        isShow: true
      };
    }

    const calendarRule = this.regla.rules?.find(
      rule => rule.columnDepend === this.formulario.get('campo')?.value
    );

    if (calendarRule) {
      calendarRule.value = this.calendarConditions;
      calendarRule.rule = EConditions.OR;
    } else {
      this.regla.rules?.push({
        columnDepend: this.formulario.get('campo')?.value || '',
        rule: EConditions.OR,
        value: this.calendarConditions
      });
    }
  }

  public eliminarCondicionCalendario(index: number): void {
    this.calendarConditions.splice(index, 1);
    this.actualizarReglaCalendario();
    this.reglaEmitter.emit(this.regla);
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

  public guardarVisibilidad(): void {
    this.formulario;
  }

  private validarTipoDato(columna: string): ETipoPregunta {
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

    return item.type as ETipoPregunta;
  }

  public filtrarGrupos(target: EventTarget | null) {}

  public filtrarCampos() {
    const columna = this.formulario.value.campo;
    this.tipoCampo = this.validarTipoDato(columna);
    let rule: EConditions;
    let value;
    if (this.tipoCampo === ETipoPregunta.Calendar) {
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

  public cargarCategorias(): void {
    const tipo = this.tipoCards.find(
      tipo => tipo.nombre === this.formulario.value.fichaTipo
    );
    this.inputsService
      .obtenerGruposFichas(Number(this.version), tipo?.tipo)
      .subscribe((result: ICategoria[]) => {
        this.grupos = result;
      });
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
    return (
      this.camposVisibles.find(
        campo => campo.columnName === this.formulario.value.campo
      )?.options || []
    );
  }

  public formatearCondicion(condicion: string): string {
    try {
      const config = JSON.parse(condicion);
      let resultado = '';

      if (config.type === 'relative') {
        if (config.years) {
          resultado += `${config.years} ${
            config.years === 1 ? 'año' : 'años'
          } `;
        }
        if (config.months) {
          resultado += `${config.months} ${
            config.months === 1 ? 'mes' : 'meses'
          } `;
        }
        if (config.days) {
          resultado += `${config.days} ${config.days === 1 ? 'día' : 'días'}`;
        }

        if (config.endMonths) {
          resultado = `Entre ${config.months} y ${config.endMonths} ${
            config.endMonths === 1 ? 'mes' : 'meses'
          }`;
        }
        if (config.endYears) {
          resultado = `Entre ${config.years} y ${config.endYears} ${
            config.endYears === 1 ? 'año' : 'años'
          }`;
        }
      } else {
        resultado = `Fecha: ${config.date}`;
      }

      return resultado.trim() || 'Sin especificar';
    } catch {
      return 'Formato inv&aacute;lido';
    }
  }

  private encontrarTipoFichaYGrupo(columnName: string): {
    fichaTipo: string;
    grupoId: number | string;
  } {
    // Buscar en datos individuales
    for (const categoria of this.formularioGenerado.individualData) {
      const pregunta = categoria.values?.find(p => p.columnName === columnName);
      if (pregunta) {
        return {
          fichaTipo: 'individualNombre',
          grupoId: categoria.id || ''
        };
      }
    }

    // Buscar en datos grupales
    for (const categoria of this.formularioGenerado.grupalData) {
      const pregunta = categoria.values?.find(p => p.columnName === columnName);
      if (pregunta) {
        return {
          fichaTipo: 'grupalNombre',
          grupoId: categoria.id || ''
        };
      }
    }

    return {
      fichaTipo: '',
      grupoId: ''
    };
  }
}
