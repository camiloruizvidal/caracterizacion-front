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

  onAlertaChange() {
    this.alertasConfiguracion.emit(this.form.value);
  }
}
