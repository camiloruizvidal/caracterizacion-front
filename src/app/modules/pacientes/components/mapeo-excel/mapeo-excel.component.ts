import {
  ICategoria,
  IFormulario,
  IPregunta
} from './../../../generador/interfaces/interface';
import { FormulariosService } from './../../../formularios/services/formularios.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { IExcelMappingTemplate } from 'src/app/interfaces/excel-mapping-template.interface';
import { IVersiones } from 'src/app/helpers/interface/interface';
import { InputsService } from '../../../generador/services/inputs.service';

interface IEncabezadoExcel {
  nombre: string;
  esBusqueda: boolean;
  categoriaId?: number;
  preguntaId?: string;
  categoriaTouched?: boolean;
  preguntaTouched?: boolean;
}

interface IPreguntaFicha {
  id: string;
  nombre: string;
}

interface ICategoriaLocal extends ICategoria {
  preguntas: IPreguntaFicha[];
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
  public encabezadosForm: FormGroup;
  public encabezadoAEliminar: IEncabezadoExcel | null = null;
  public encabezadoEditando: { indice: number; valorOriginal: string } | null =
    null;
  public valorEditando: string = '';
  public versiones: IVersiones[] = [];
  public categorias: ICategoriaLocal[] = [];
  public plantillaMapeada: IExcelMappingTemplate = {
    fichaJsonId: 0,
    columnasExcel: [],
    mapeo: {}
  };
  public mostrarErrores: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formulariosService: FormulariosService,
    private inputsService: InputsService
  ) {
    this.formularioEncabezado = this.fb.group({
      nuevoEncabezado: ['', [Validators.required]],
      versionId: [null, [Validators.required]]
    });

    this.encabezadosForm = this.fb.group({
      encabezados: this.fb.array([])
    });
  }

  get listaEncabezados() {
    return this.encabezadosForm.get('encabezados') as FormArray;
  }

  private crearEncabezadoFormGroup(encabezado: IEncabezadoExcel): FormGroup {
    return this.fb.group({
      nombre: [encabezado.nombre],
      esBusqueda: [encabezado.esBusqueda],
      categoriaId: [encabezado.categoriaId || null, Validators.required],
      preguntaId: [encabezado.preguntaId || null, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.cargarVersiones();
  }

  private cargarVersiones(): void {
    this.formulariosService.obtenerVersiones().subscribe({
      next: (versiones: IVersiones[]) => {
        this.versiones = versiones;
      },
      error: error => {
        console.error('Error al cargar versiones:', error);
      }
    });
  }

  private cargarCategorias(versionId: number): void {
    this.inputsService.obtenerFormularioJson(versionId).subscribe({
      next: (response: { data: IFormulario }) => {
        this.categorias = response.data.individualData
          .filter(
            (categoria: ICategoria) =>
              categoria.values && categoria.values.length > 0
          )
          .map((categoria: ICategoria) => ({
            ...categoria,
            id: categoria.id as number,
            order: categoria.orden || 0,
            title: categoria.title,
            subtitle: categoria.subtitle || null,
            preguntas:
              categoria.values
                ?.filter((pregunta: IPregunta) => pregunta.type !== 'subtitle')
                .map((pregunta: IPregunta) => ({
                  id: pregunta.columnName as string,
                  nombre: pregunta.label
                })) || []
          }));
      }
    });
  }

  public onVersionSeleccionada(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const fichaId = Number(selectElement.value);
    this.plantillaMapeada.fichaJsonId = fichaId;

    if (fichaId) {
      const versionSeleccionada = this.versiones.find(v => v.id === fichaId);
      if (versionSeleccionada) {
        this.cargarCategorias(Number(versionSeleccionada.version));
      }
    } else {
      this.categorias = [];
    }
  }

  public agregarEncabezado(): void {
    if (this.formularioEncabezado.valid) {
      const nuevoNombre = this.formularioEncabezado
        .get('nuevoEncabezado')
        ?.value?.trim();
      const versionId = this.formularioEncabezado.get('versionId')?.value;

      if (!versionId) {
        this.toastr.warning(
          'Debe seleccionar una versión de la ficha',
          'Advertencia'
        );
        return;
      }

      if (
        nuevoNombre &&
        !this.encabezados.some(e => e.nombre === nuevoNombre)
      ) {
        const nuevoEncabezado: IEncabezadoExcel = {
          nombre: nuevoNombre,
          esBusqueda: false
        };

        this.encabezados.push(nuevoEncabezado);
        this.listaEncabezados.push(
          this.crearEncabezadoFormGroup(nuevoEncabezado)
        );

        this.plantillaMapeada.columnasExcel.push(nuevoNombre);
        this.plantillaMapeada.mapeo[nuevoNombre] = {
          categoriaId: '',
          preguntaId: '',
          esBusqueda: false
        };
        this.formularioEncabezado.patchValue({ nuevoEncabezado: '' });
      }
    }
  }

  public confirmarEliminacion(modal: any, encabezado: IEncabezadoExcel): void {
    this.encabezadoAEliminar = encabezado;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
  }

  public eliminarEncabezado(): void {
    if (this.encabezadoAEliminar !== null) {
      const nombreEncabezado =
        this.encabezados[this.encabezados.indexOf(this.encabezadoAEliminar)]
          .nombre;

      this.encabezados.splice(
        this.encabezados.indexOf(this.encabezadoAEliminar),
        1
      );

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
      valorOriginal: this.encabezados[indice].nombre
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
    this.encabezadosForm.markAllAsTouched();

    if (this.encabezadosForm.invalid) {
      this.toastr.warning(
        'Debe completar la categoría y pregunta para todos los encabezados',
        'Advertencia'
      );
      return;
    }

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

  public onCategoriaSeleccionada(evento: Event, indice: number): void {
    const select = evento.target as HTMLSelectElement;
    const categoriaId = select.value ? parseInt(select.value, 10) : null;
    const encabezadoForm = this.listaEncabezados.at(indice) as FormGroup;

    encabezadoForm.patchValue({
      categoriaId: categoriaId,
      preguntaId: null
    });

    this.encabezados[indice].categoriaId = categoriaId || undefined;
    this.encabezados[indice].preguntaId = undefined;

    if (categoriaId) {
      this.toastr.info(
        'Seleccione una pregunta para completar la relación',
        'Información'
      );
    }
  }

  public onPreguntaSeleccionada(evento: Event, indice: number): void {
    const select = evento.target as HTMLSelectElement;
    const preguntaId = select.value || null;
    const encabezadoForm = this.listaEncabezados.at(indice) as FormGroup;

    encabezadoForm.patchValue({
      preguntaId: preguntaId
    });

    this.encabezados[indice].preguntaId = preguntaId || undefined;

    if (preguntaId) {
      this.toastr.success('Relación establecida correctamente', 'Éxito');
    }
  }

  public obtenerPreguntasPorCategoria(
    categoriaId: number | undefined
  ): IPreguntaFicha[] {
    if (!categoriaId) return [];
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria?.preguntas || [];
  }
}
