import { DetalleService } from './../../services/detalle/detalle.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IFichaDescripcion,
  IFichaYDescripcion,
  IPsicosocialPersona
} from 'src/app/helpers/interface/interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  @ViewChild('tarjetas', { static: false }) elementRef!: ElementRef;
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

  public generatePdf() {
    let pdf = new jsPDF('p', 'pt', 'letter');
    console.log(this.elementRef.nativeElement);
    pdf.html(this.elementRef.nativeElement, {
      callback: pdf => {
        pdf.save('prueba.pdf');
      }
    });
    //const elementToPrint: HTMLElement = document.getElementById(
    //  'tarjetas'
    //) as HTMLElement;
    //html2canvas(elementToPrint, { scale: 2 }).then(canvas => {
    //  const pdf = new jsPDF('p', 'pt', 'letter');
    //  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
    //  pdf.setFontSize(12);
    //  //pdf.save('Caracterizacion.pdf');
    //  pdf.save();
    //});
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
    return this.fichaFamiliar.descripcion.find(
      descripcion =>
        this.snakeCaseToCamelCase(descripcion.columnName) === keyName
    );
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
