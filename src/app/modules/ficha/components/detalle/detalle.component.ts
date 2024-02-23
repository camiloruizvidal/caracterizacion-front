import { DetalleService } from './../../services/detalle/detalle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IFichaDescripcion,
  IFichaYDescripcion,
  IPsicosocialPersona
} from 'src/app/helpers/interface/interface';

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

  public getLabelDescription(key: string): IFichaDescripcion | null {
    const value = this.fichaFamiliar.descripcion.find(
      descripcion => descripcion.columnName === key
    );
    return value || null;
  }

  public getLabelForm(key: string): IFichaDescripcion | undefined {
    const keyName = this.snakeCaseToCamelCase(key);
    const value = this.fichaFamiliar.descripcion.find(
      descripcion =>
        this.snakeCaseToCamelCase(descripcion.columnName) === keyName
    );
    console.log({ value, key });
    return value;
  }

  private snakeCaseToCamelCase(text: string) {
    return text.replace(/_([a-z])/g, function (match, group1) {
      return group1.toUpperCase();
    });
  }

  public getKeys(object: any): string[] {
    const keysNotInclude = [
      'id',
      'personaId',
      'fichaId',
      'created_at',
      'updated_at',
      'persona'
    ];
    const keys = Object.keys(object);
    return keys.filter(key => !keysNotInclude.includes(key));
  }

  public getKeysPerson(object: IPsicosocialPersona): string[] {
    const keysNotInclude = ['id', 'created_at', 'updated_at'];
    const keys = Object.keys(object.persona);
    return keys.filter(key => !keysNotInclude.includes(key));
  }

  public getValue(objectData: any, key: string): any {
    let value = objectData[key];
    if (key == 'ubicacion_gps') {
      value = `Longitud: ${objectData[key].lng}, latitud: ${objectData[key].lat}.`;
    }
    if (value === null) {
      value = '-';
    }
    return value;
  }
}
