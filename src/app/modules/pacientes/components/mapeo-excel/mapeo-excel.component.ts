import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { IExcelMappingTemplate } from 'src/app/interfaces/excel-mapping-template.interface';

interface IEncabezadoExcel {
  nombre: string;
  esBusqueda: boolean;
}

@Component({
  selector: 'app-mapeo-excel',
  templateUrl: './mapeo-excel.component.html',
  styleUrls: ['./mapeo-excel.component.scss']
})
export class MapeoExcelComponent implements OnInit {
  @ViewChild('editInput') editInput!: ElementRef;
  @ViewChild('modalBusqueda') modalBusqueda!: any;
  @ViewChild('inputNuevoEncabezado') inputNuevoEncabezado!: ElementRef;

  public encabezados: IEncabezadoExcel[] = [];
  public formularioEncabezado: FormGroup;
  public encabezadoAEliminar: { indice: number; nombre: string } | null = null;
  public encabezadoEditando: { indice: number; nombre: string } | null = null;
  public valorEditando: string = '';
  public plantillaMapeada: IExcelMappingTemplate = {
    fichaJsonId: 0,
    columnasExcel: [],
    mapeo: {}
  };

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.formularioEncabezado = this.fb.group({
      nuevoEncabezado: ['', [Validators.required]]
    });
  }

  public ngOnInit(): void {}

  public agregarEncabezado(): void {
    if (this.formularioEncabezado.valid) {
      const nuevoNombre = this.formularioEncabezado
        .get('nuevoEncabezado')
        ?.value?.trim();
      if (
        nuevoNombre &&
        !this.encabezados.some(e => e.nombre === nuevoNombre)
      ) {
        this.encabezados.push({
          nombre: nuevoNombre,
          esBusqueda: false
        });

        this.plantillaMapeada.columnasExcel.push(nuevoNombre);
        this.plantillaMapeada.mapeo[nuevoNombre] = {
          categoriaId: '',
          preguntaId: '',
          esBusqueda: false
        };
        this.formularioEncabezado.reset();
      }
    }
  }

  public confirmarEliminacion(
    modal: any,
    indice: number,
    encabezado: IEncabezadoExcel
  ): void {
    this.encabezadoAEliminar = { indice, nombre: encabezado.nombre };
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  public eliminarEncabezado(): void {
    if (this.encabezadoAEliminar !== null) {
      const nombreEncabezado =
        this.encabezados[this.encabezadoAEliminar.indice].nombre;

      this.encabezados.splice(this.encabezadoAEliminar.indice, 1);

      this.plantillaMapeada.columnasExcel =
        this.plantillaMapeada.columnasExcel.filter(c => c !== nombreEncabezado);
      delete this.plantillaMapeada.mapeo[nombreEncabezado];
      this.modalService.dismissAll();
      this.encabezadoAEliminar = null;
    }
  }

  public editarEncabezado(indice: number): void {
    this.encabezadoEditando = {
      indice,
      nombre: this.encabezados[indice].nombre
    };
    this.valorEditando = this.encabezados[indice].nombre;
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    });
  }

  public actualizarValorEditando(evento: Event): void {
    this.valorEditando = (evento.target as HTMLInputElement).value;
  }

  public guardarEdicion(): void {
    const valorTrimmed = this.valorEditando.trim();
    if (this.encabezadoEditando !== null && valorTrimmed) {
      const nombreAntiguo =
        this.encabezados[this.encabezadoEditando.indice].nombre;
      const mapeoAntiguo = this.plantillaMapeada.mapeo[nombreAntiguo];

      this.encabezados[this.encabezadoEditando.indice].nombre = valorTrimmed;

      this.plantillaMapeada.columnasExcel =
        this.plantillaMapeada.columnasExcel.map(c =>
          c === nombreAntiguo ? valorTrimmed : c
        );
      delete this.plantillaMapeada.mapeo[nombreAntiguo];
      this.plantillaMapeada.mapeo[valorTrimmed] = mapeoAntiguo;

      this.encabezadoEditando = null;
      this.valorEditando = '';

      setTimeout(() => {
        this.inputNuevoEncabezado.nativeElement.focus();
      });
    }
  }

  public cancelarEdicion(): void {
    this.encabezadoEditando = null;
    this.valorEditando = '';

    setTimeout(() => {
      this.inputNuevoEncabezado.nativeElement.focus();
    });
  }

  public alternarBusqueda(indice: number): void {
    const encabezadoSeleccionado = this.encabezados[indice];

    if (encabezadoSeleccionado.esBusqueda) {
      return;
    }

    this.encabezados.forEach((encabezado, i) => {
      encabezado.esBusqueda = i === indice;
      this.plantillaMapeada.mapeo[encabezado.nombre].esBusqueda = i === indice;
    });

    this.toastr.info(
      `El elemento "${encabezadoSeleccionado.nombre}" es el parámetro por el que se hará la búsqueda`,
      'Parámetro de búsqueda',
      { timeOut: 5000 }
    );
  }

  public guardarEncabezados(): void {
    if (this.encabezados.length === 0) {
      this.toastr.warning('No hay encabezados para exportar', 'Advertencia');
      return;
    }

    const tieneCampoBusqueda = this.encabezados.some(e => e.esBusqueda);
    if (!tieneCampoBusqueda) {
      this.modalService.open(this.modalBusqueda, {
        ariaLabelledBy: 'modal-busqueda-title',
        centered: true
      });
      return;
    }

    const datos = [this.encabezados.map(e => e.nombre)];
    const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
    const hojaExcel: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(libroExcel, hojaExcel, 'Encabezados');
    XLSX.writeFile(libroExcel, 'encabezados.xlsx');
    this.toastr.success('Archivo Excel generado correctamente', 'Éxito');
  }
}
