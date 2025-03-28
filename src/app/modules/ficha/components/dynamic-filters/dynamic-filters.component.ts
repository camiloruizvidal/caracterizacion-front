import {
  condiciones,
  ICategoria,
  TipoDataForm,
  IFormulario,
  ETipoPregunta,
  IOptionsSelect
} from './../../../generador/interfaces/interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EConditions,
  ICondiciones,
  IFiltrosBusqueda
} from 'src/app/modules/generador/interfaces/interface';

@Component({
  selector: 'app-dynamic-filters',
  templateUrl: './dynamic-filters.component.html',
  styleUrls: ['./dynamic-filters.component.scss']
})
export class DynamicFiltersComponent implements OnInit {
  @Input() tarjetaJson!: IFormulario;
  @Output() filtrosEmitidos = new EventEmitter<IFiltrosBusqueda[]>();
  public condiciones: ICondiciones[] = condiciones;
  public filtrosForm: FormGroup;
  public filtros: IFiltrosBusqueda[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.filtrosForm = this.formBuilder.group({
      tipoTarjeta: ['', Validators.required],
      grupo: ['', Validators.required],
      pregunta: ['', Validators.required],
      condicion: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  get grupos() {
    return this.obtenerGrupos(this.filtrosForm.get('tipoTarjeta')?.value);
  }

  public ngOnInit(): void {
    this.cargarCondiciones();
  }

  private cargarCondiciones() {
    this.condiciones = condiciones;
  }

  public obtenerCambiosTarjeta(filtro: any) {
    filtro.get('seccion')?.reset();
    filtro.get('pregunta')?.reset();
  }

  public agregarFiltro(): void {
    if (!this.filtrosForm.valid) {
      // Marcar todos los campos como touched para mostrar los errores
      Object.keys(this.filtrosForm.controls).forEach(key => {
        const control = this.filtrosForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    const filtro = { ...this.filtrosForm.value };
    const tipoPregunta = this.obtenerTipoPregunta(
      filtro.grupo,
      filtro.pregunta
    );

    // Si es tipo select, buscamos el option correspondiente al value
    if (tipoPregunta === 'select') {
      const opciones = this.obtenerOpcionesSelect(
        filtro.grupo,
        filtro.pregunta
      );
      const opcionSeleccionada = opciones.find(
        opt => opt.value === filtro.valor
      );
      if (opcionSeleccionada) {
        // Guardamos el value en una propiedad separada para la búsqueda
        filtro.valorBusqueda = filtro.valor;
        // Y usamos el option para mostrar
        filtro.valor = opcionSeleccionada.option;
      }
    } else if (tipoPregunta === 'check') {
      const opciones = this.obtenerOpcionesCheck(filtro.grupo, filtro.pregunta);
      const opcionSeleccionada = opciones.find(
        opt => opt.value === filtro.valor
      );
      if (opcionSeleccionada) {
        filtro.valorBusqueda = filtro.valor;
        filtro.valor = opcionSeleccionada.option;
      }
    }

    this.filtros.push(filtro);
    this.filtrosForm.reset();
    this.filtrosForm = this.formBuilder.group({
      tipoTarjeta: ['', Validators.required],
      grupo: ['', Validators.required],
      pregunta: ['', Validators.required],
      condicion: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  public eliminarFiltro(indice: number): void {
    this.filtros.splice(indice, 1);
  }

  public obtenerGrupos(tipoTarjeta: TipoDataForm): ICategoria[] {
    return this.tarjetaJson[tipoTarjeta];
  }

  public verCondicion(condicionSeleccionada: EConditions): string {
    const condicion = condiciones.find(
      condicion => condicion.condition === condicionSeleccionada
    );
    return `${condicion?.text}`;
  }

  public verTipoDeTarjeta(tipoTarjeta: TipoDataForm): string {
    let texto = '';
    if (tipoTarjeta === 'grupalData') {
      texto = this.tarjetaJson.grupalNombre;
    } else if (tipoTarjeta === 'individualData') {
      texto = this.tarjetaJson.individualNombre;
    }
    return texto;
  }

  public obtenerPreguntas(seccion: string) {
    const grupos = [
      ...this.tarjetaJson.grupalData,
      ...this.tarjetaJson.individualData
    ];
    const grupo = grupos.find(g => g.title === seccion);
    return grupo?.values || [];
  }

  public obtenerTipoPregunta(seccion: string, pregunta: string): string {
    const grupos = [
      ...this.tarjetaJson.grupalData,
      ...this.tarjetaJson.individualData
    ];
    const grupo = grupos.find(g => g.title === seccion);
    const preguntaObj = grupo?.values?.find(v => v.label === pregunta);
    return preguntaObj?.type || '';
  }

  public obtenerOpcionesSelect(
    seccion: string,
    pregunta: string
  ): IOptionsSelect[] {
    const grupos = [
      ...this.tarjetaJson.grupalData,
      ...this.tarjetaJson.individualData
    ];
    const grupo = grupos.find(g => g.title === seccion);
    const preguntaObj = grupo?.values?.find(v => v.label === pregunta);
    if (preguntaObj?.type === 'select' && Array.isArray(preguntaObj.options)) {
      return preguntaObj.options as IOptionsSelect[];
    }
    return [];
  }

  public obtenerOpcionesCheck(
    seccion: string,
    pregunta: string
  ): { value: string; option: string }[] {
    const grupos = [
      ...this.tarjetaJson.grupalData,
      ...this.tarjetaJson.individualData
    ];
    const grupo = grupos.find(g => g.title === seccion);
    const preguntaObj = grupo?.values?.find(v => v.label === pregunta);
    if (preguntaObj?.type === 'check' && preguntaObj.options) {
      const options = preguntaObj.options as {
        valueTrue: string;
        valueFalse: string;
      };
      return [
        { value: options.valueTrue, option: 'Sí' },
        { value: options.valueFalse, option: 'No' }
      ];
    }
    return [];
  }

  public obtenerCondicionesFiltradas(): ICondiciones[] {
    const tipoPregunta = this.obtenerTipoPregunta(
      this.filtrosForm.get('grupo')?.value,
      this.filtrosForm.get('pregunta')?.value
    );

    if (tipoPregunta === 'select' || tipoPregunta === 'check') {
      return this.condiciones.filter(
        condicion =>
          condicion.condition === EConditions.IGUAL_QUE ||
          condicion.condition === EConditions.DIFERENTE_QUE
      );
    }

    return this.condiciones;
  }

  public buscar() {
    // Convertimos los filtros para usar valorBusqueda cuando existe
    const filtrosParaBusqueda = this.filtros.map(filtro => ({
      ...filtro,
      valor: filtro.valorBusqueda || filtro.valor
    }));
    this.filtrosEmitidos.emit(filtrosParaBusqueda);
  }
}
