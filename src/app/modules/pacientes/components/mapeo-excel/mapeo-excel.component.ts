import {
  ICategoria,
  IFormulario,
  IPregunta
} from './../../../generador/interfaces/interface';
import { FormulariosService } from './../../../formularios/services/formularios.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { IExcelMappingTemplate } from 'src/app/interfaces/excel-mapping-template.interface';
import { IVersiones } from 'src/app/helpers/interface/interface';
import { InputsService } from '../../../generador/services/inputs.service';
import {
  CargasService,
  ICargaResponse
} from '../../services/cargas/cargas.service';

interface IEncabezadoExcel {
  nombre: string;
  esBusqueda: boolean;
  categoriaId?: number;
  preguntaId?: string;
  categoriaTouched?: boolean;
  preguntaTouched?: boolean;
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
  public versionSeleccionada: number | null = null;
  public categorias: ICategoria[] = [];
  public plantillaMapeada: FormGroup;
  public mostrarErrores: boolean = false;
  public archivoSeleccionado: File | null = null;
  public cargaActual: ICargaResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formulariosService: FormulariosService,
    private inputsService: InputsService,
    private cargasService: CargasService
  ) {
    this.formularioEncabezado = this.fb.group({
      nuevoEncabezado: ['', [Validators.required]],
      versionId: [null, [Validators.required]]
    });

    this.encabezadosForm = this.fb.group({
      encabezados: this.fb.array([])
    });

    this.plantillaMapeada = this.fb.group({
      fichaJsonId: [0],
      columnasExcel: [[]],
      mapeo: this.fb.array([])
    });
  }

  get listaEncabezados() {
    return this.encabezadosForm.get('encabezados') as FormArray;
  }

  get mapeoArray() {
    return this.plantillaMapeada.get('mapeo') as FormArray;
  }

  private crearEncabezadoFormGroup(encabezado: IEncabezadoExcel): FormGroup {
    return this.fb.group({
      nombre: [encabezado.nombre],
      esBusqueda: [encabezado.esBusqueda],
      categoriaId: [encabezado.categoriaId || null, Validators.required],
      preguntaId: [encabezado.preguntaId || null, Validators.required]
    });
  }

  private crearMapeoFormGroup(encabezado: IEncabezadoExcel): FormGroup {
    return this.fb.group({
      columnaExcel: [encabezado.nombre],
      categoriaId: [''],
      preguntaId: [''],
      esBusqueda: [false]
    });
  }

  public ngOnInit(): void {
    this.cargarVersiones();
    this.cargarCargaActual();
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

  private cargarCargaActual(): void {
    this.cargaActual = this.cargasService.obtenerCargaDelLocalStorage();
    if (this.cargaActual) {
      this.verificarEstadoCarga();
    }
  }

  private verificarEstadoCarga(): void {
    if (this.cargaActual) {
      this.cargasService
        .verificarEstadoCarga(this.cargaActual.carga_id)
        .subscribe(response => {
          this.cargaActual = response;
          this.cargasService.guardarCargaEnLocalStorage(response);

          if (
            response.estado === 'rechazado' ||
            response.estado === 'cancelado'
          ) {
            this.cargasService.limpiarCargaDelLocalStorage();
            this.cargaActual = null;
          } else {
            // Si sigue en proceso, verificamos de nuevo en 5 segundos
            setTimeout(() => this.verificarEstadoCarga(), 5000);
          }
        });
    }
  }

  public onVersionSeleccionada(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const fichaId = Number(selectElement.value);
    this.versionSeleccionada = fichaId;
    this.plantillaMapeada.get('fichaJsonId')?.setValue(fichaId);
    if (fichaId) {
      const versionSeleccionada = this.versiones.find(
        (version: IVersiones) => version.id === fichaId
      );
      if (versionSeleccionada) {
        console.log({ fichaId: versionSeleccionada.version });
        this.cargarCategorias(Number(versionSeleccionada.version));
      }
    } else {
      this.categorias = [];
    }
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
    }
  }

  public cargarArchivo(): void {
    if (
      this.plantillaMapeada.get('fichaJsonId')?.value &&
      this.archivoSeleccionado
    ) {
      this.cargasService
        .cargarArchivo(
          this.plantillaMapeada.get('fichaJsonId')?.value,
          this.archivoSeleccionado
        )
        .subscribe(response => {
          this.cargaActual = response;
          this.cargasService.guardarCargaEnLocalStorage(response);
          this.verificarEstadoCarga();
        });
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

        const columnasExcel =
          this.plantillaMapeada.get('columnasExcel')?.value || [];
        columnasExcel.push(nuevoNombre);
        this.plantillaMapeada.patchValue({ columnasExcel });

        this.mapeoArray.push(this.crearMapeoFormGroup(nuevoEncabezado));
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

      const columnasExcel =
        this.plantillaMapeada.get('columnasExcel')?.value || [];
      this.plantillaMapeada.patchValue({
        columnasExcel: columnasExcel.filter(
          (c: string) => c !== nombreEncabezado
        )
      });

      const mapeoIndex = this.mapeoArray.controls.findIndex(
        (control: AbstractControl) =>
          (control as FormGroup).get('columnaExcel')?.value === nombreEncabezado
      );
      if (mapeoIndex !== -1) {
        this.mapeoArray.removeAt(mapeoIndex);
      }

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

      this.encabezados[this.encabezadoEditando.indice].nombre = valorTrimmed;

      const columnasExcel =
        this.plantillaMapeada.get('columnasExcel')?.value || [];
      this.plantillaMapeada.patchValue({
        columnasExcel: columnasExcel.map((c: string) =>
          c === nombreAntiguo ? valorTrimmed : c
        )
      });

      const mapeoIndex = this.mapeoArray.controls.findIndex(
        (control: AbstractControl) =>
          (control as FormGroup).get('columnaExcel')?.value === nombreAntiguo
      );
      if (mapeoIndex !== -1) {
        const mapeoControl = this.mapeoArray.at(mapeoIndex);
        mapeoControl.patchValue({ columnaExcel: valorTrimmed });
      }

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

    this.encabezados.forEach(encabezado => {
      encabezado.esBusqueda = false;
    });
    this.encabezados[indice].esBusqueda = true;

    this.mapeoArray.controls.forEach((control: AbstractControl) => {
      const columnaExcel = (control as FormGroup).get('columnaExcel')?.value;
      (control as FormGroup).patchValue({
        esBusqueda: columnaExcel === encabezadoSeleccionado.nombre
      });
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

    this.formulariosService
      .guardarMapeoExcel(this.plantillaMapeada.value)
      .subscribe({
        next: () => {
          this.toastr.success('Mapeo guardado correctamente', 'Éxito');

          const datos = [this.encabezados.map(e => e.nombre)];
          const libroExcel: XLSX.WorkBook = XLSX.utils.book_new();
          const hojaExcel: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
          XLSX.utils.book_append_sheet(libroExcel, hojaExcel, 'Encabezados');
          XLSX.writeFile(libroExcel, 'encabezados.xlsx');
          this.toastr.success('Archivo Excel generado correctamente', 'Éxito');
        },
        error: error => {
          this.toastr.error('Error al guardar el mapeo', 'Error');
          console.error('Error al guardar mapeo:', error);
        }
      });
  }

  public onCategoriaSeleccionada(evento: Event, indice: number): void {
    const select = evento.target as HTMLSelectElement;
    const categoriaId = select.value ? parseInt(select.value, 10) : null;
    const encabezadoForm = this.listaEncabezados.at(indice) as FormGroup;
    const nombreEncabezado = this.encabezados[indice].nombre;

    encabezadoForm.patchValue({
      categoriaId: categoriaId,
      preguntaId: null
    });

    this.encabezados[indice].categoriaId = categoriaId || undefined;
    this.encabezados[indice].preguntaId = undefined;

    const mapeoIndex = this.mapeoArray.controls.findIndex(
      (control: AbstractControl) =>
        (control as FormGroup).get('columnaExcel')?.value === nombreEncabezado
    );
    if (mapeoIndex !== -1) {
      const mapeoControl = this.mapeoArray.at(mapeoIndex);
      mapeoControl.patchValue({
        categoriaId: categoriaId?.toString() || '',
        preguntaId: ''
      });
    }
  }

  public onPreguntaSeleccionada(evento: Event, indice: number): void {
    const select = evento.target as HTMLSelectElement;
    const preguntaId = select.value || null;
    const encabezadoForm = this.listaEncabezados.at(indice) as FormGroup;
    const nombreEncabezado = this.encabezados[indice].nombre;

    encabezadoForm.patchValue({
      preguntaId: preguntaId
    });

    this.encabezados[indice].preguntaId = preguntaId || undefined;

    const mapeoIndex = this.mapeoArray.controls.findIndex(
      (control: AbstractControl) =>
        (control as FormGroup).get('columnaExcel')?.value === nombreEncabezado
    );
    if (mapeoIndex !== -1) {
      this.mapeoArray.at(mapeoIndex).patchValue({
        preguntaId: preguntaId || ''
      });
    }
  }

  public obtenerPreguntasPorCategoria(
    categoriaId: number | undefined
  ): IPregunta[] {
    if (!categoriaId) return [];
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria?.values || [];
  }
}
