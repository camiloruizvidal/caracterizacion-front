import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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

  public encabezados: IEncabezadoExcel[] = [];
  public formularioEncabezado: FormGroup;
  public encabezadoAEliminar: { indice: number; nombre: string } | null = null;
  public encabezadoEditando: { indice: number; nombre: string } | null = null;
  private valorEditando: string = '';

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.formularioEncabezado = this.fb.group({
      nuevoEncabezado: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  agregarEncabezado(): void {
    if (this.formularioEncabezado.valid) {
      const nuevoNombre =
        this.formularioEncabezado.get('nuevoEncabezado')?.value;
      if (
        nuevoNombre &&
        !this.encabezados.some(e => e.nombre === nuevoNombre)
      ) {
        this.encabezados.push({
          nombre: nuevoNombre,
          esBusqueda: false
        });
        this.formularioEncabezado.reset();
      }
    }
  }

  confirmarEliminacion(
    modal: any,
    indice: number,
    encabezado: IEncabezadoExcel
  ): void {
    this.encabezadoAEliminar = { indice, nombre: encabezado.nombre };
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  eliminarEncabezado(): void {
    if (this.encabezadoAEliminar !== null) {
      this.encabezados.splice(this.encabezadoAEliminar.indice, 1);
      this.modalService.dismissAll();
      this.encabezadoAEliminar = null;
    }
  }

  editarEncabezado(indice: number): void {
    this.encabezadoEditando = {
      indice,
      nombre: this.encabezados[indice].nombre
    };
    this.valorEditando = this.encabezados[indice].nombre;
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    });
  }

  actualizarValorEditando(evento: Event): void {
    this.valorEditando = (evento.target as HTMLInputElement).value;
  }

  guardarEdicion(): void {
    if (this.encabezadoEditando !== null && this.valorEditando.trim()) {
      this.encabezados[this.encabezadoEditando.indice].nombre =
        this.valorEditando;
      this.encabezadoEditando = null;
      this.valorEditando = '';
    }
  }

  cancelarEdicion(): void {
    this.encabezadoEditando = null;
    this.valorEditando = '';
  }

  alternarBusqueda(indice: number): void {
    const encabezadoSeleccionado = this.encabezados[indice];

    // Si ya estaba seleccionado, no hacemos nada
    if (encabezadoSeleccionado.esBusqueda) {
      return;
    }

    // Desactivamos la búsqueda en todos los encabezados
    this.encabezados.forEach((encabezado, i) => {
      encabezado.esBusqueda = i === indice;
    });

    // Mostramos el toast
    this.toastr.info(
      `El elemento "${encabezadoSeleccionado.nombre}" es el parámetro por el que se hará la búsqueda`,
      'Parámetro de búsqueda',
      { timeOut: 5000 }
    );
  }

  guardarEncabezados(): void {
    // Aquí implementaremos la lógica para guardar los encabezados
    console.log('Encabezados guardados:', this.encabezados);
  }
}
