import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-excel-mapping',
  templateUrl: './excel-mapping.component.html',
  styleUrls: ['./excel-mapping.component.scss']
})
export class ExcelMappingComponent implements OnInit {
  @ViewChild('editInput') editInput!: ElementRef;

  public encabezados: string[] = [];
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
      const nuevoEncabezado =
        this.formularioEncabezado.get('nuevoEncabezado')?.value;
      if (nuevoEncabezado && !this.encabezados.includes(nuevoEncabezado)) {
        this.encabezados.push(nuevoEncabezado);
        this.formularioEncabezado.reset();
      }
    }
  }

  confirmarEliminar(modal: any, index: number, nombre: string): void {
    this.encabezadoAEliminar = { index, nombre };
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
      nombre: this.encabezados[index]
    };
    this.valorEditando = this.encabezados[index];
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    });
  }

  onEditInput(event: Event): void {
    this.valorEditando = (event.target as HTMLInputElement).value;
  }

  guardarEdicion(): void {
    if (this.encabezadoEditando !== null && this.valorEditando.trim()) {
      this.encabezados[this.encabezadoEditando.index] = this.valorEditando;
      this.encabezadoEditando = null;
      this.valorEditando = '';
    }
  }

  cancelarEdicion(): void {
    this.encabezadoEditando = null;
    this.valorEditando = '';
  }

  guardarEncabezados(): void {
    // Aquí implementaremos la lógica para guardar los encabezados
    console.log('Encabezados guardados:', this.encabezados);
  }
}
