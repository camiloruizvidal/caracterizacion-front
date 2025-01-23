import {
  condiciones,
  IStepers,
  TipoDataForm
} from './../../../generador/interfaces/interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EConditions,
  ICondiciones,
  IFamilyCard,
  IFiltrosBusqueda
} from 'src/app/modules/generador/interfaces/interface';

@Component({
  selector: 'app-dynamic-filters',
  templateUrl: './dynamic-filters.component.html',
  styleUrls: ['./dynamic-filters.component.scss']
})
export class DynamicFiltersComponent implements OnInit {
  @Input() tarjetaJson!: IFamilyCard;
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
      return;
    }
    this.filtros.push(this.filtrosForm.value);
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

  public obtenerGrupos(tipoTarjeta: TipoDataForm): IStepers[] {
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

  public buscar() {
    this.filtrosEmitidos.emit(this.filtros);
  }
}
