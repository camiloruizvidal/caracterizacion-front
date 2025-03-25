import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-excel-mapping',
  templateUrl: './excel-mapping.component.html',
  styleUrls: ['./excel-mapping.component.scss']
})
export class ExcelMappingComponent implements OnInit {
  public encabezados: string[] = [];
  public formularioEncabezado: FormGroup;

  constructor(private fb: FormBuilder) {
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

  eliminarEncabezado(index: number): void {
    this.encabezados.splice(index, 1);
  }

  guardarEncabezados(): void {
    // Aquí implementaremos la lógica para guardar los encabezados
    console.log('Encabezados guardados:', this.encabezados);
  }
}
