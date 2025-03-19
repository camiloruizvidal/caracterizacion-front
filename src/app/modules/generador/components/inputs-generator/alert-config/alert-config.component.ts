import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ETipoPregunta,
  IAlertas,
  IOptionsCheck,
  IOptionsSelect
  //IPlanCuidado
} from '../../../interfaces/interface';

@Component({
  selector: 'app-alert-config',
  templateUrl: './alert-config.component.html',
  styleUrls: ['./alert-config.component.scss']
})
export class AlertConfigComponent implements OnInit, OnChanges {
  @Input() tipoPregunta!: ETipoPregunta;
  @Input() alertasDisponibles: IAlertas[] = [];
  @Input() opciones: IOptionsSelect[] = [];
  @Input() configuracion: any;
  @Output() alertasConfiguracion = new EventEmitter<any>();

  public form: FormGroup;
  protected ETipoPregunta = ETipoPregunta;
  public planesCuidado: { [key: string]: string[] } = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.actualizarFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['tipoPregunta'] || changes['opciones']) && this.tipoPregunta) {
      this.actualizarFormulario();
    }
    if (changes['configuracion'] && this.configuracion) {
      this.cargarConfiguracion();
    }
  }

  private actualizarFormulario() {
    // Resetear el formulario
    for (const control in this.form.controls) {
      this.form.removeControl(control);
    }

    switch (this.tipoPregunta) {
      case ETipoPregunta.Check:
      case ETipoPregunta.CheckSiNo:
        this.form.addControl('Si', this.fb.control(''));
        this.form.addControl('No', this.fb.control(''));
        break;
      case ETipoPregunta.Select:
      case ETipoPregunta.SelectMultiple:
        if (this.opciones && this.opciones.length > 0) {
          this.opciones.forEach(opcion => {
            const controlName = opcion.value;
            if (controlName) {
              this.form.addControl(controlName, this.fb.control(''));
            }
          });
        }
        break;
    }

    // Cargar la configuración después de inicializar el formulario
    if (this.configuracion) {
      this.cargarConfiguracion();
    }
  }

  private cargarConfiguracion() {
    if (!this.configuracion?.valores_alerta) return;

    console.log('Cargando configuración:', this.configuracion);

    // Cargar valores de alerta
    Object.keys(this.configuracion.valores_alerta).forEach(key => {
      const valor = this.configuracion.valores_alerta[key];
      if (this.form.contains(key)) {
        console.log(`Cargando valor para ${key}:`, valor.valor);
        this.form.get(key)?.setValue(valor.valor);
      }
    });

    // Cargar planes de cuidado
    Object.keys(this.configuracion.valores_alerta).forEach(key => {
      const valor = this.configuracion.valores_alerta[key];
      if (valor.planes_cuidado?.length > 0) {
        console.log(
          `Cargando planes de cuidado para ${key}:`,
          valor.planes_cuidado
        );
        this.planesCuidado[key] = [...valor.planes_cuidado];
        // Agregar controles para los planes de cuidado
        valor.planes_cuidado.forEach((plan: string, index: number) => {
          this.form.addControl(
            `planesCuidado_${key}_${index}`,
            this.fb.control(plan)
          );
        });
      }
    });
  }

  agregarPlanCuidado(controlName: string) {
    if (!this.planesCuidado[controlName]) {
      this.planesCuidado[controlName] = [];
    }
    const index = this.planesCuidado[controlName].length;
    this.planesCuidado[controlName].push('');
    this.form.addControl(
      `planesCuidado_${controlName}_${index}`,
      this.fb.control('')
    );
    // Emitir cambios cuando se agrega un nuevo plan
    this.onAlertaChange();
  }

  onPlanCuidadoChange(controlName: string, index: number) {
    const formControl = this.form.get(`planesCuidado_${controlName}_${index}`);
    if (
      formControl &&
      this.planesCuidado[controlName] &&
      index < this.planesCuidado[controlName].length
    ) {
      this.planesCuidado[controlName][index] = formControl.value?.trim() || '';
      this.onAlertaChange();
    }
  }

  eliminarPlanCuidado(controlName: string, index: number) {
    this.planesCuidado[controlName].splice(index, 1);
    this.form.removeControl(`planesCuidado_${controlName}_${index}`);
    this.onAlertaChange();
  }

  onAlertaChange() {
    const formValue = this.form.value;
    const configuracion: {
      [key: string]: {
        valor: number;
        planes_cuidado?: string[];
      };
    } = {};

    // Primero, actualizar los planes de cuidado con los valores del formulario
    Object.keys(formValue).forEach(key => {
      if (key.startsWith('planesCuidado_')) {
        const [_, controlName, indexStr] = key.split('_');
        const index = parseInt(indexStr);
        if (
          this.planesCuidado[controlName] &&
          !isNaN(index) &&
          index < this.planesCuidado[controlName].length
        ) {
          // Guardar solo la descripción como string
          const descripcion = formValue[key]?.trim() || '';
          if (descripcion) {
            this.planesCuidado[controlName][index] = descripcion;
          }
        }
      }
    });

    // Luego, construir la configuración
    Object.keys(formValue).forEach(key => {
      if (!key.startsWith('planesCuidado_') && formValue[key]) {
        // Configuración base con el valor de la alerta
        configuracion[key] = {
          valor: parseInt(formValue[key])
        };

        // Solo agregar planes de cuidado si existen y no están vacíos
        if (this.planesCuidado[key]) {
          const planesCuidadoFiltrados = this.planesCuidado[key].filter(
            plan => plan.trim() !== ''
          );

          if (planesCuidadoFiltrados.length > 0) {
            configuracion[key].planes_cuidado = planesCuidadoFiltrados;
          }
        }
      }
    });

    console.log('Configuración a emitir:', {
      genera_alerta: true,
      valores_alerta: configuracion
    });

    this.alertasConfiguracion.emit({
      genera_alerta: true,
      valores_alerta: configuracion
    });
  }
}
