import { DetalleService } from './../../services/detalle/detalle.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IFichaDescripcion,
  IFichaYDescripcion,
  IPsicosocialPersona
} from 'src/app/helpers/interface/interface';
import { jsPDF } from 'jspdf';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer,
    private detalleService: DetalleService
  ) {
    this.id = Number(this.route.snapshot.params['id']);
  }

  public ngOnInit(): void {
    this.cargarFichas();
  }

  public generatePdf() {
    let pdf = new jsPDF('p', 'pt', 'letter');
    pdf.setLanguage('es-CO');
    pdf.html(this.elementRef.nativeElement, {
      callback: pdf => {
        pdf.save('prueba.pdf');
      },
      margin: [30, 0, 30, 0]
    });
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

  public getValue(
    objectData: any,
    key: string,
    isShow: boolean = true
  ): string | SafeHtml {
    let value = objectData[key];
    if (key == 'ubicacion_gps' && !isShow) {
      value = `Longitud: ${objectData[key].lng}. Latitud: ${objectData[key].lat}`;
    }
    if (key == 'ubicacion_gps' && isShow) {
      const url =
        'https://www.google.com/maps/dir//' +
        `${objectData[key].lat},` +
        `${objectData[key].lng}/` +
        `@${objectData[key].lat},` +
        `${objectData[key].lng}z` +
        '/data=!4m2!4m1!3e0?entry=ttu';

      value = `Longitud: ${objectData[key].lng}<br>Latitud: ${objectData[key].lat}.
              <br>
              <a target="_blank" href="${url}">
                <i class="bi bi-globe-americas"></i>
                ir al sitio
              </a>`;
      value = this.sanitizer.bypassSecurityTrustHtml(value);
    }
    if (value === null) {
      value = '-';
    }
    return value;
  }

  public getNumberPage(index: number): string {
    return `${index + 1} de ${
      this.fichaFamiliar.ficha.psicosocialPersonas.length
    }`;
  }
}
