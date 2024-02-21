import { DetalleService } from './../../services/detalle/detalle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IFichaDescripcion,
  IFichaYDescripcion
} from 'src/app/helpers/interface/interface';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  private id: number;
  public fichaFamiliar!: IFichaYDescripcion;

  constructor(
    private route: ActivatedRoute,
    private detalleService: DetalleService
  ) {
    this.id = Number(this.route.snapshot.params['id']);
  }

  public ngOnInit(): void {
    this.cargarFichas();
  }

  private cargarFichas(): void {
    this.detalleService
      .cargarFichaDetalle(this.id)
      .subscribe((detalle: IFichaYDescripcion) => {
        this.fichaFamiliar = detalle;
      });
  }

  public getLabel(key: string): IFichaDescripcion | null {
    const value = this.fichaFamiliar.descripcion.find(
      descripcion => descripcion.columnName === key
    );
    return value || null;
  }

  public getKeys(object: any): string[] {
    return Object.keys(object);
  }

  public getValue(objectData: any, key: string): any {
    if (key == 'ubicacion_gps') {
      return `Longitud: ${objectData[key].lng}, latitud: ${objectData[key].lat}.`;
    }
    return objectData[key];
  }
}
