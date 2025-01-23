import {
  condiciones,
  IStepers,
  TipoDataForm
} from './../../../generador/interfaces/interface';
import { Component, Input, OnInit } from '@angular/core';
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
    let valores: IStepers[] = [];

    if (tipoTarjeta === 'grupalData') {
      valores = this.tarjetaJson.grupalData;
    } else if (tipoTarjeta === 'individualData') {
      valores = this.tarjetaJson.individualData;
    }
    return valores;
  }

  public verCondicion(condicionSeleccionada: EConditions): string {
    const condicion = condiciones.find(
      condicion => condicion.condition === condicionSeleccionada
    );
    return `${condicion?.text}`;
  }

  public obtenerPreguntas(seccion: string) {
    const grupos = [
      ...this.tarjetaJson.grupalData,
      ...this.tarjetaJson.individualData
    ];
    const grupo = grupos.find(g => g.title === seccion);
    return grupo?.values || [];
  }

  get grupos() {
    return this.obtenerGrupos(this.filtrosForm.get('tipoTarjeta')?.value);
  }
}
