import { Component, Input, OnInit } from '@angular/core';
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
export class AlertConfigComponent implements OnInit {
  @Input() tipoPregunta!: ETipoPregunta;
  @Input() alertasDisponibles: IAlertas[] = [];

  public form!: FormGroup;
  public opciones: any[] = [];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    this.cargarOpciones();
  }

  private initForm() {
    const formControls: { [key: string]: any[] } = {};

    if (this.tipoPregunta) {
      switch (this.tipoPregunta) {
        case ETipoPregunta.Check:
        case ETipoPregunta.CheckSiNo:
          formControls['Si'] = [''];
          formControls['No'] = [''];
          break;
        case ETipoPregunta.Select:
        case ETipoPregunta.SelectMultiple:
          // Se agregarán dinámicamente al cargar las opciones
          break;
      }
    }

    this.form = this.fb.group(formControls);
  }

  private cargarOpciones() {
    switch (this.tipoPregunta) {
      case ETipoPregunta.Check:
      case ETipoPregunta.CheckSiNo:
        this.opciones = [
          { label: 'Sí', value: true },
          { label: 'No', value: false }
        ];
        break;
      case ETipoPregunta.Select:
      case ETipoPregunta.SelectMultiple:
        // Aquí cargaríamos las opciones del select
        this.opciones = [
          { label: 'Opción 1', value: '1' },
          { label: 'Opción 2', value: '2' },
          { label: 'Opción 3', value: '3' }
        ];
        // Agregamos controles dinámicamente
        this.opciones.forEach(opcion => {
          this.form.addControl(opcion.label, this.fb.control(''));
        });
        break;
    }
  }
}
