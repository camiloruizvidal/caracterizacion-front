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
  IOptionsSelect,
  IPlanCuidado
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
  @Output() alertasConfiguracion = new EventEmitter<any>();

  public form: FormGroup;
  protected ETipoPregunta = ETipoPregunta;
  public planesCuidado: { [key: string]: IPlanCuidado[] } = {};

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
  }

  agregarPlanCuidado(controlName: string) {
    if (!this.planesCuidado[controlName]) {
      this.planesCuidado[controlName] = [];
    }
    const index = this.planesCuidado[controlName].length;
    this.planesCuidado[controlName].push({
      descripcion: '',
      tipo: 'categoria'
    });
    this.form.addControl(
      `planesCuidado_${controlName}_${index}`,
      this.fb.control('')
    );
  }

  onPlanCuidadoChange(controlName: string, index: number) {
    const formControl = this.form.get(`planesCuidado_${controlName}_${index}`);
    if (
      formControl &&
      this.planesCuidado[controlName] &&
      this.planesCuidado[controlName][index]
    ) {
      this.planesCuidado[controlName][index].descripcion =
        formControl.value?.trim() || '';
      this.onAlertaChange();
    }
  }

  eliminarPlanCuidado(controlName: string, index: number) {
    this.planesCuidado[controlName].splice(index, 1);
    this.form.removeControl(`planesCuidado_${controlName}_${index}`);
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
        const [_, controlName, index] = key.split('_');
        if (
          this.planesCuidado[controlName] &&
          this.planesCuidado[controlName][parseInt(index)]
        ) {
          this.planesCuidado[controlName][parseInt(index)].descripcion =
            formValue[key];
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
        const planesCuidadoActuales = this.planesCuidado[key] || [];
        const planesCuidadoFiltrados = planesCuidadoActuales
          .filter(plan => plan.descripcion.trim() !== '')
          .map(plan => plan.descripcion.trim());

        if (planesCuidadoFiltrados.length > 0) {
          configuracion[key].planes_cuidado = planesCuidadoFiltrados;
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
