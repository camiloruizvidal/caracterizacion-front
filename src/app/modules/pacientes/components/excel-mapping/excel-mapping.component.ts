import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface IEncabezado {
  nombre: string;
  esBusqueda: boolean;
}

@Component({
  selector: 'app-excel-mapping',
  templateUrl: './excel-mapping.component.html',
  styleUrls: ['./excel-mapping.component.scss']
})
export class ExcelMappingComponent implements OnInit {
  @ViewChild('editInput') editInput!: ElementRef;

  public encabezados: IEncabezado[] = [];
  public formularioEncabezado: FormGroup;
  public encabezadoAEliminar: { index: number; nombre: string } | null = null;
  public encabezadoEditando: { index: number; nombre: string } | null = null;
  private valorEditando: string = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
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

  confirmarEliminar(modal: any, index: number, encabezado: IEncabezado): void {
    this.encabezadoAEliminar = { index, nombre: encabezado.nombre };
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  eliminarEncabezado(): void {
    if (this.encabezadoAEliminar !== null) {
      this.encabezados.splice(this.encabezadoAEliminar.index, 1);
      this.modalService.dismissAll();
      this.encabezadoAEliminar = null;
    }
  }

  editarEncabezado(index: number): void {
    this.encabezadoEditando = {
      index,
      nombre: this.encabezados[index].nombre
    };
    this.valorEditando = this.encabezados[index].nombre;
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    });
  }

  onEditInput(event: Event): void {
    this.valorEditando = (event.target as HTMLInputElement).value;
  }

  guardarEdicion(): void {
    if (this.encabezadoEditando !== null && this.valorEditando.trim()) {
      this.encabezados[this.encabezadoEditando.index].nombre =
        this.valorEditando;
      this.encabezadoEditando = null;
      this.valorEditando = '';
    }
  }

  cancelarEdicion(): void {
    this.encabezadoEditando = null;
    this.valorEditando = '';
  }

  toggleBusqueda(index: number): void {
    // Primero desactivamos la búsqueda en todos los encabezados
    this.encabezados.forEach((encabezado, i) => {
      encabezado.esBusqueda = i === index;
    });
  }

  guardarEncabezados(): void {
    // Aquí implementaremos la lógica para guardar los encabezados
    console.log('Encabezados guardados:', this.encabezados);
  }
}
