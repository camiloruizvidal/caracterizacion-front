import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  condiciones,
  IFamilyCard
} from 'src/app/modules/generador/interfaces/interface';

@Component({
  selector: 'app-dynamic-filters',
  templateUrl: './dynamic-filters.component.html',
  styleUrls: ['./dynamic-filters.component.scss']
})
export class DynamicFiltersComponent implements OnInit {
  @Input() tarjetaJson!: IFamilyCard;
  public condiciones: any[] = [];
  public filtrosForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filtrosForm = this.formBuilder.group({
      filtros: this.formBuilder.array([])
    });
  }

  public ngOnInit(): void {
    this.cargarCondiciones();
  }

  private cargarCondiciones() {
    this.condiciones = condiciones;
  }

  get filtros(): FormArray {
    return this.filtrosForm.get('filtros') as FormArray;
  }

  public agregarFiltro(): void {
    const filtro = this.formBuilder.group({
      nombreTarjeta: ['', Validators.required],
      seccion: ['', Validators.required],
      pregunta: ['', Validators.required],
      condicion: ['', Validators.required],
      valor: ['', Validators.required]
    });
    this.filtros.push(filtro);
  }

  public eliminarFiltro(indice: number): void {
    this.filtros.removeAt(indice);
  }

  public obtenerGrupos(nombreTarjeta: string) {
    return nombreTarjeta === this.tarjetaJson.grupalNombre
      ? this.tarjetaJson.grupalData
      : this.tarjetaJson.individualData;
  }

  public obtenerPreguntas(seccion: string) {
    const grupos = [
      ...this.tarjetaJson.grupalData,
      ...this.tarjetaJson.individualData
    ];
    const grupo = grupos.find(g => g.title === seccion);
    return grupo?.values || [];
  }
}
