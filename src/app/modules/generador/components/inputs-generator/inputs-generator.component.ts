import { IVersiones } from './../../../../helpers/interface/interface';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {
  IOptionsVisibility,
  IPregunta,
  TipoDataForm,
  TipoForm,
  IFormulario,
  ETipoPregunta,
  ICategoria,
  IAlertas,
  IAlertaConfig
} from './../../interfaces/interface';
import { InputsService } from './../../services/inputs.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { FormulariosService } from 'src/app/modules/formularios/services/formularios.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inputs-generator',
  templateUrl: './inputs-generator.component.html',
  styleUrls: ['./inputs-generator.component.scss']
})
export class InputsGeneratorComponent implements OnInit {
  public grupos: ICategoria[] = [];
  public formulario: FormGroup;
  public agregarGrupoForm: FormGroup;
  public tipos: string[] = [];
  public formularioGenerado!: IFormulario;
  public esEditable: boolean = false;
  public tipoCards: {
    tipo: TipoDataForm;
    nombre: TipoForm;
    tituloTexto: string;
    text: string;
  }[] = [];
  public typesOptions: string[] = [
    ETipoPregunta.SelectFilter,
    ETipoPregunta.SelectMultiple,
    ETipoPregunta.Select,
    ETipoPregunta.SelectDependiente
  ];
  public versiones: IVersiones[] = [];

  public modalForm!: FormGroup;
  public modalFormTipoFicha!: FormGroup;

  public alertasDisponibles: IAlertas[] = [];
  public tiposConAlertas = [
    ETipoPregunta.Check,
    ETipoPregunta.CheckSiNo,
    ETipoPregunta.Select,
    ETipoPregunta.SelectMultiple
  ];

  public jsonValido = true;
  public opcionesSelect: any[] = [];

  public alertaConfiguracionTemporal: any;

  public indexEditar: number = -1;

  public esFormatoExcel: boolean = false;
  public contenidoExcel: string = '';

  public alertasVisibles: { [key: number]: boolean } = {};

  @ViewChild('contentTipoFicha') contentTipoFicha: any;

  constructor(
    private formBuilder: FormBuilder,
    private inputsService: InputsService,
    private toastr: ToastrService,
    private formulariosService: FormulariosService,
    private modalService: NgbModal
  ) {
    this.formulario = this.formBuilder.group({
      fichaTipo: ['', Validators.required],
      grupo: ['', Validators.required],
      tipo: [''],
      esRequerido: [false],
      esVisibleSi: [false],
      label: ['', Validators.required],
      description: [null],
      type: [''],
      options: [null],
      optionsJSON: [''],
      default: [null],
      visibility: [true],
      required: [false],
      value: null,
      nombreColumna: [''],
      version: [''],
      fichaTipoVisible: [''],
      nombrePadreDependiente: [''],
      grupoVisible: [''],
      reglas: ['']
    });

    this.agregarGrupoForm = this.formBuilder.group({
      nuevoFichaTipo: ['', Validators.required],
      nombreGrupo: ['', Validators.required]
    });

    this.modalForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      grupalNombre: ['', Validators.required],
      individualNombre: ['', Validators.required]
    });

    this.modalFormTipoFicha = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipoFicha: [''],
      ubicacion: [1],
      alerta: this.formBuilder.group({
        genera_alerta: [false],
        clasificaciones: this.formBuilder.array([])
      })
    });

    this.formulario.get('optionsJSON')?.valueChanges.subscribe(value => {
      try {
        if (value) {
          const jsonData = JSON.parse(value);
          if (Array.isArray(jsonData)) {
            this.jsonValido = true;
            this.opcionesSelect = jsonData;
            this.formulario.patchValue(
              { options: jsonData },
              { emitEvent: false }
            );
          } else {
            this.jsonValido = false;
            this.opcionesSelect = [];
          }
        } else {
          this.jsonValido = true;
          this.opcionesSelect = [];
        }
      } catch (error) {
        this.jsonValido = false;
        this.opcionesSelect = [];
      }
    });

    this.formulario.get('grupo')?.valueChanges.subscribe(grupoId => {
      if (grupoId) {
        this.cargarAlertasDeCategoria(grupoId);
      } else {
        this.alertasDisponibles = [];
      }
    });
  }

  public ngOnInit(): void {
    this.cargarTipoFichas();
    this.cargarGrupos();
    this.cargarTipoPreguntas();
    this.cargarVersiones();
  }

  private cargarTipoPreguntas() {
    this.tipos = Object.keys(ETipoPregunta).sort();
  }

  public cargarTipoFichas() {
    const version = this.versiones.find(
      version => this.formulario.value.version === version.version
    );

    this.tipoCards = [
      {
        nombre: 'grupalNombre',
        tituloTexto: version?.grupalNombre ?? '',
        tipo: 'grupalData',
        text: 'Global'
      },
      {
        nombre: 'individualNombre',
        tituloTexto: version?.individualNombre ?? '',
        tipo: 'individualData',
        text: 'Individual'
      }
    ];
    this.cargarFormulario(this.formulario.get('version')?.value);
  }

  private cargarVersiones() {
    this.formulariosService.obtenerVersiones().subscribe({
      next: (versiones: IVersiones[]) => {
        this.versiones = versiones;
      },
      error: (error: any) => {
        console.error('Error al cargar versiones:', error);
      }
    });
  }

  private deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (
      typeof obj1 !== 'object' ||
      obj1 === null ||
      typeof obj2 !== 'object' ||
      obj2 === null
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  private cargarFormulario(id: number) {
    if (!id) {
      console.warn('ID no válido para cargar formulario');
      this.formularioGenerado = {
        isFinish: false,
        grupalNombre: '',
        individualNombre: '',
        grupalData: [],
        individualData: [],
        alertaGrupal: [],
        alertaIndividual: [],
        version: '0'
      };
      return;
    }

    this.inputsService.obtenerFormularioJson(id).subscribe({
      next: response => {
        if (!this.deepEqual(this.formularioGenerado, response.data)) {
          this.formularioGenerado = response.data || {
            isFinish: false,
            grupalNombre: '',
            individualNombre: '',
            grupalData: [],
            individualData: [],
            alertaGrupal: [],
            alertaIndividual: [],
            version: '0'
          };
        }
        const navbarItems = document.querySelectorAll(
          '.navbar-items'
        ) as NodeListOf<HTMLElement>;
        if (navbarItems && navbarItems.length > 0) {
          navbarItems[0].click();
        }
      },
      error: error => {
        console.error('Error al cargar formulario:', error);
        this.formularioGenerado = {
          isFinish: false,
          grupalNombre: '',
          individualNombre: '',
          grupalData: [],
          individualData: [],
          alertaGrupal: [],
          alertaIndividual: [],
          version: '0'
        };
      }
    });
  }

  public cargarGrupos(): void {
    const tipo = this.tipoCards.find(
      tipo => tipo.nombre === this.formulario.value.fichaTipo
    );
    this.inputsService
      .obtenerGruposFichas(Number(this.formulario.value.version), tipo?.tipo)
      .subscribe((result: ICategoria[]) => {
        this.grupos = result;
        this.alertasDisponibles = [];
      });
  }

  private getTipo() {
    return this.formulario.value.tipo === ETipoPregunta.CheckSiNo
      ? ETipoPregunta.Check
      : this.formulario.value.tipo;
  }

  public agregar(): void {
    if (this.isValidForm) {
      const fichaTipo: TipoForm = this.formulario.value.fichaTipo as TipoForm;
      let valueIndex = this.agregarGrupoAForm(
        this.formulario.value.grupo,
        fichaTipo
      );
      const campo: TipoDataForm = this.tipoData[fichaTipo] as TipoDataForm;
      const valor: any = this.formularioGenerado[campo][valueIndex];
      const orden = valor?.values?.length;
      const visibility =
        this.formulario.value.reglas === ''
          ? true
          : this.formulario.value.reglas;
      const steperValues: IPregunta = {
        label: this.formulario.value.label.trim(),
        type: this.getTipo(),
        options: this.getOptions(),
        required: this.formulario.value.esRequerido,
        columnName: this.crearNombreColumna(),
        default: this.formulario.value.default,
        value: null,
        visibility,
        orden,
        alerta: this.alertaConfiguracionTemporal
      };
      if (this.formulario.value.nombrePadreDependiente.trim() !== '') {
        steperValues['nombrePadreDependiente'] =
          this.formulario.value.nombrePadreDependiente.trim();
      }
      this.formularioGenerado[campo][valueIndex]?.values?.push(steperValues);
      this.formulario.value.label = '';
      this.formularioGenerado.version = this.formulario.value.version;
      this.formularioGenerado.grupalNombre = this.tipoCards[0].tituloTexto;
      this.formularioGenerado.individualNombre = this.tipoCards[1].tituloTexto;

      this.alertaConfiguracionTemporal = undefined;

      this.guardarFormulario();
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  public getOptions() {
    let options;
    if (this.formulario.value.tipo === ETipoPregunta.CheckSiNo) {
      options = { valueTrue: 'Sí', valueFalse: 'No' };
      this.formulario.patchValue({
        options,
        default: 'No'
      });
      return options;
    } else {
      const esOptions = this.typesOptions.includes(this.formulario.value.tipo);
      let value;
      try {
        value = JSON.parse(this.formulario.value.optionsJSON);
      } catch (error) {
        value = [];
      }
      options = esOptions ? value : null;

      this.formulario.patchValue({
        options
      });
      return options;
    }
  }

  private agregarGrupoAForm(tipoGrupo: any, tipoForm: TipoForm) {
    const campo = this.tipoData[tipoForm];
    let valores: any[] = this.formularioGenerado[
      campo as keyof typeof this.formularioGenerado
    ] as [];

    let index = valores?.findIndex(
      (value: any) => value.id === Number(this.formulario.value.grupo)
    );
    if (index === -1) {
      const grupo = this.grupos.find(grupo => grupo.id === Number(tipoGrupo));
      if (grupo) {
        valores.push({
          ...grupo,
          values: []
        });
        index = valores.findIndex(
          value => value.id === Number(this.formulario.value.grupo)
        );
      }
    }
    return index;
  }

  private crearNombreColumna(): string {
    return (
      this.formulario.value.label
        .normalize('NFD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_') + `-${uuid()}`
    );
  }

  public cambioItem(
    nuevoOrden: any,
    value: IPregunta,
    indexCard: number,
    tarjeta: TipoForm
  ) {
    const ordenAnterior = Number(value.orden);
    const tipoData = this.tipoData[tarjeta];
    const items = this.formularioGenerado[tipoData][indexCard]?.values;
    if (items && Array.isArray(items)) {
      const item = items[ordenAnterior];
      items.splice(ordenAnterior, 1);
      items.splice(Number(nuevoOrden.target.value), 0, item);
      this.actualizarOrden();
    }
  }

  public actualizarOrden() {
    const tipos: TipoForm[] = ['grupalNombre', 'individualNombre'];
    tipos.forEach((tipo: TipoForm) => {
      const tipoData = this.tipoData[tipo];
      const categorias = this.formularioGenerado[tipoData];
      if (Array.isArray(categorias)) {
        categorias.forEach((item: ICategoria, index: number) => {
          let orden = 0;
          item.orden = index;
          if (item.values && Array.isArray(item.values)) {
            item.values.forEach(items => {
              items.orden = orden;
              orden = orden + 1;
            });
          }
        });
      }
    });
    this.guardarFormulario();
  }

  public getKeys(value: any): string[] {
    const values = Object.keys(value);
    const valuesDelete = [
      'id',
      'columnName',
      'createdAt',
      'updatedAt',
      'orden',
      'ficha_grupo_id'
    ];
    return values.filter(value => !valuesDelete.includes(value));
  }

  public editar(
    tipo: TipoForm,
    index: number,
    indexValue: number,
    value: IPregunta
  ) {
    const tipoData = this.tipoData[tipo];
    const grupo = this.formularioGenerado[tipoData]?.[index];

    if (!grupo || typeof grupo.id !== 'number') return;

    this.formulario.patchValue({
      fichaTipo: tipo,
      tipo: value.type,
      options: value.options,
      label: value.label,
      grupo: grupo.id,
      default: value.default,
      esRequerido: value.required
    });

    try {
      this.formulario.patchValue({
        optionsJSON: JSON.stringify(value.options, null, 2)
      });
    } catch (error) {
      this.formulario.patchValue({
        optionsJSON: ''
      });
    }

    if (grupo.id) {
      this.cargarAlertasDeCategoria(grupo.id);
    }

    if (value.alerta) {
      this.alertaConfiguracionTemporal = {
        genera_alerta: true,
        valores_alerta: value.alerta.valores_alerta,
        peso: value.alerta.peso || 1
      };
    } else {
      this.alertaConfiguracionTemporal = undefined;
    }

    this.indexEditar = indexValue;
    this.esEditable = true;
  }

  public guardarEdicion() {
    if (!this.isValidForm) {
      this.toastr.error('Por favor complete todos los campos requeridos');
      return;
    }

    const tipo: TipoForm = this.formulario.value.fichaTipo;
    const tipoData = this.tipoData[tipo];
    const datos = this.formularioGenerado[tipoData];

    if (!Array.isArray(datos)) {
      this.toastr.error('Error al guardar la edición');
      return;
    }

    const indexGrupo = datos.findIndex(
      (value: ICategoria) => value.id === Number(this.formulario.value.grupo)
    );

    if (indexGrupo === -1) {
      this.toastr.error('No se encontró el grupo seleccionado');
      return;
    }

    const values = datos[indexGrupo]?.values?.[this.indexEditar];

    if (values) {
      values.label = this.formulario.value.label.trim();
      values.options = this.getOptions();
      values.type = this.getTipo();
      values.visibility = true;
      values.required = this.formulario.value.esRequerido;
      values.default = this.formulario.value.default;

      if (this.alertaConfiguracionTemporal) {
        values.alerta = this.alertaConfiguracionTemporal;
      }

      this.guardarFormulario();
      this.esEditable = false;
      this.indexEditar = -1;
      this.alertaConfiguracionTemporal = undefined;

      this.toastr.success('Pregunta actualizada correctamente');
    }
  }

  public cancelarEdicion() {
    this.esEditable = false;
    this.indexEditar = -1;
    this.alertaConfiguracionTemporal = undefined;
    this.formulario.reset();
  }

  public guardarRegla(reglas: IOptionsVisibility) {
    this.formulario.patchValue({ reglas });
  }

  public desmarcarSiEsVisible(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (!checkbox.checked) {
      this.formulario.get('reglas')?.setValue('');
    }
  }

  public eliminar(
    tipo: 'grupalNombre' | 'individualNombre',
    index: number,
    indexValue: number
  ) {
    const tipoKey = this.tipoData[tipo] as keyof typeof this.formularioGenerado;

    (this.formularioGenerado[tipoKey] as any[])[index].values?.splice(
      indexValue,
      1
    );

    const categorias = this.formularioGenerado[tipoKey] as any[];
    categorias.forEach(categoria => {
      if (categoria.values && Array.isArray(categoria.values)) {
        categoria.values.forEach((pregunta: IPregunta, i: number) => {
          pregunta.orden = i;
        });
      }
    });

    this.guardarFormulario();
  }

  public getValue(key: any, value: any): any {
    if (value.type === ETipoPregunta.SelectDependiente) {
      return value.label;
    } else {
      return value[key];
    }
  }

  public guardarFormulario() {
    this.inputsService
      .guardarFormulario(this.formularioGenerado)
      .subscribe(response => {
        this.toastr.success(
          'Se actualizó el formulario',
          'El nuevo item ha sido agregado'
        );
      });
  }

  public selectAllText(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  public obtenerTipoInput(value: string): string {
    const values = ETipoPregunta as any;
    return values[value];
  }

  public agregarNuevaVersion(content: any) {
    this.modalForm.reset();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-title' })
      .result.then(
        result => {
          console.log(`Modal cerrado con: ${result}`);
        },
        reason => {
          console.log(`Modal cerrado: ${this.getDismissReason(reason)}`);
        }
      );
  }

  public agregarNuevoGrupo(content: any): void {
    this.modalFormTipoFicha.reset();
    this.modalFormTipoFicha.value.tipoFicha = this.formulario.value.fichaTipo;
    this.indexEditar = -1;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-title' })
      .result.then(
        result => {
          console.log(`Modal cerrado con: ${result}`);
        },
        reason => {
          console.log(`Modal cerrado: ${this.getDismissReason(reason)}`);
        }
      );
  }

  public guardarNuevaVersion(modal: any) {
    if (this.modalForm.valid) {
      this.formulariosService
        .crearNuevaVersionFicha({
          nombre: this.modalForm.value.nombre,
          grupalNombre: this.modalForm.value.grupalNombre,
          individualNombre: this.modalForm.value.individualNombre
        })
        .subscribe({
          next: () => {
            this.cargarVersiones();
            modal.close('Guardado');
          },
          error: (error: any) => {
            console.error('Error al guardar nueva versión:', error);
          }
        });
    }
  }

  public guardarNuevoGrupo(modalTipoFicha: any) {
    const tipo = this.tipoCards.find(
      tipo => tipo.nombre === this.formulario.value.fichaTipo
    );

    if (this.modalFormTipoFicha.valid && tipo?.tipo) {
      const clasificaciones = this.modalFormTipoFicha.get(
        'alerta.clasificaciones'
      ) as FormArray;
      this.validarRangos(clasificaciones);

      if (
        clasificaciones.controls.some(
          control =>
            control.get('rango_minimo')?.errors ||
            control.get('rango_maximo')?.errors
        )
      ) {
        this.toastr.error('Hay errores en los rangos de las clasificaciones');
        return;
      }

      const clasificacionesTransformadas = clasificaciones.value.map(
        (clasificacion: any) => ({
          ...clasificacion,
          planes_cuidado: clasificacion.planes_cuidado.map(
            (plan: any) => plan.descripcion
          )
        })
      );

      const grupoData = {
        nombre: this.modalFormTipoFicha.value.nombre,
        tipoFicha: tipo.tipo,
        version: this.formulario.value.version,
        alerta: this.modalFormTipoFicha.value.alerta.genera_alerta
          ? {
              genera_alerta: true,
              clasificaciones: clasificacionesTransformadas
            }
          : undefined
      };

      this.formulariosService.crearNuevoGrupo(grupoData).subscribe({
        next: () => {
          this.cargarGrupos();
          modalTipoFicha.close('Guardado');
        },
        error: error => {
          console.error('Error al guardar:', error);
        }
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Presionó ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Hizo clic fuera del modal';
    }
    return `Motivo desconocido: ${reason}`;
  }

  private obtenerIdFichaTipo(nombre: TipoForm): number {
    let tipoid = 0;
    switch (nombre) {
      case 'grupalNombre':
        tipoid = 1;
        break;
      case 'individualNombre':
        tipoid = 2;
        break;
    }
    return tipoid;
  }

  public get gruposVisiblesFiltrado(): any[] {
    let tipoid: number = 0;
    switch (this.formulario.value.fichaTipoVisible) {
      case 'grupalNombre':
        tipoid = 1;
        break;
      case 'individualNombre':
        tipoid = 2;
        break;
    }
    return this.grupos.filter(grupo => grupo.ficha_tipo_id === tipoid);
  }

  public get esVisibleSi(): boolean {
    return this.formulario.value.esVisibleSi;
  }

  public get isValidForm(): boolean {
    return (
      this.formulario.value.fichaTipo.trim() !== '' &&
      `${this.formulario.value.grupo}`.trim() !== '' &&
      this.formulario.value.label.trim() !== ''
    );
  }

  public get isShowJson(): boolean {
    return this.typesOptions.includes(this.formulario.value.tipo);
  }

  public tipoData: { [key in TipoForm]: TipoDataForm } = {
    grupalNombre: 'grupalData',
    individualNombre: 'individualData'
  };

  public get preguntasFiltradasPorForm(): IPregunta[] {
    const fichaTipo: TipoForm = this.formulario.value.fichaTipo as TipoForm;
    const campo: TipoDataForm = this.tipoData[fichaTipo] as TipoDataForm;
    let valores: any[] = this.formularioGenerado[campo];
    const value = valores.find(
      (value: any) => value.id === Number(this.formulario.value.grupo)
    );
    const values: any[] = value?.values as [];
    return values.filter(value => this.typesOptions.includes(value.type)) || [];
  }

  get clasificacionesForm() {
    return this.modalFormTipoFicha.get('alerta.clasificaciones') as FormArray;
  }

  agregarClasificacion() {
    const clasificaciones = this.modalFormTipoFicha.get(
      'alerta.clasificaciones'
    ) as FormArray;

    const nuevoGrupo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      rango_minimo: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      rango_maximo: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      color: ['#000000'],
      planes_cuidado: this.formBuilder.array([])
    });

    nuevoGrupo.get('rango_minimo')?.valueChanges.subscribe(() => {
      this.validarRangos(clasificaciones);
    });

    nuevoGrupo.get('rango_maximo')?.valueChanges.subscribe(() => {
      this.validarRangos(clasificaciones);
    });

    clasificaciones.push(nuevoGrupo);

    setTimeout(() => {
      const ultimoIndex = clasificaciones.length - 1;
      const nombreInput = document.querySelector(
        `[formGroupName="${ultimoIndex}"] input[formControlName="nombre"]`
      ) as HTMLInputElement;
      if (nombreInput) {
        nombreInput.focus();
      }
    });
  }

  private validarRangos(clasificaciones: FormArray) {
    const rangos = clasificaciones.controls.map(control => ({
      min: control.get('rango_minimo')?.value,
      max: control.get('rango_maximo')?.value
    }));

    clasificaciones.controls.forEach((control, index) => {
      const minControl = control.get('rango_minimo');
      const maxControl = control.get('rango_maximo');

      if (!minControl || !maxControl) return;

      const min = minControl.value;
      const max = maxControl.value;

      minControl.setErrors(null);
      maxControl.setErrors(null);

      if (min >= max) {
        maxControl.setErrors({
          invalidRange: 'El rango máximo debe ser mayor que el mínimo'
        });
      }

      rangos.forEach((rango, otherIndex) => {
        if (index !== otherIndex && rango.min !== null && rango.max !== null) {
          if (
            (min >= rango.min && min <= rango.max) ||
            (max >= rango.min && max <= rango.max) ||
            (min <= rango.min && max >= rango.max)
          ) {
            minControl.setErrors({
              overlap: 'Los rangos no pueden cruzarse'
            });
            maxControl.setErrors({
              overlap: 'Los rangos no pueden cruzarse'
            });
          }
        }
      });
    });
  }

  eliminarClasificacion(index: number) {
    this.clasificacionesForm.removeAt(index);
  }

  private cargarAlertasDeCategoria(grupoId: number) {
    try {
      if (!grupoId) {
        console.warn('ID de grupo no válido');
        this.alertasDisponibles = [];
        return;
      }

      const fichaTipo: TipoForm = this.formulario.get('fichaTipo')?.value;
      if (!fichaTipo) {
        console.warn('No hay tipo de ficha seleccionado');
        this.alertasDisponibles = [];
        return;
      }

      const campo: TipoDataForm = this.tipoData[fichaTipo];
      if (!campo || !this.formularioGenerado) {
        console.warn('No hay formulario generado o tipo de ficha no válido');
        this.alertasDisponibles = [];
        return;
      }

      const datos = this.formularioGenerado[campo];
      if (!Array.isArray(datos)) {
        console.warn('Los datos no son un array:', datos);
        this.alertasDisponibles = [];
        return;
      }

      const categoria = datos.find((cat: any) => cat.id === Number(grupoId));
      if (!categoria) {
        console.warn('No se encontró la categoría:', grupoId);
        this.alertasDisponibles = [];
        return;
      }

      if (
        categoria?.alerta?.genera_alerta &&
        Array.isArray(categoria?.alerta?.clasificaciones)
      ) {
        const clasificacionesOrdenadas = [
          ...categoria.alerta.clasificaciones
        ].sort((a, b) => b.rango_maximo - a.rango_maximo);

        this.alertasDisponibles = clasificacionesOrdenadas.map(
          (c: any, index: number) => ({
            id: (clasificacionesOrdenadas.length - index).toString(),
            nombre: c.nombre,
            color: c.color,
            rango_minimo: c.rango_minimo,
            rango_maximo: c.rango_maximo,
            valor: clasificacionesOrdenadas.length - index
          })
        );
      } else {
        console.warn('La categoría no tiene alertas configuradas');
        this.alertasDisponibles = [];
      }
    } catch (error) {
      console.error('Error al cargar alertas:', error);
      this.alertasDisponibles = [];
    }
  }

  public mostrarConfiguracionAlertas(): boolean {
    const tipoActual = this.formulario.get('tipo')?.value;
    const resultado = this.tiposConAlertas.includes(tipoActual);
    const tieneOpciones = this.opcionesSelect.length > 0;
    return resultado && this.jsonValido && tieneOpciones;
  }

  public onAlertasConfiguracion(config: any) {
    if (!config || !config.valores_alerta) {
      console.warn('Configuración de alertas inválida');
      return;
    }

    const valores_alerta = Object.keys(config.valores_alerta).reduce(
      (acc: any, key) => {
        const valor = config.valores_alerta[key];
        acc[key] = {
          valor: valor.valor
        };

        if (valor.planes_cuidado?.length > 0) {
          acc[key].planes_cuidado = valor.planes_cuidado;
        }

        return acc;
      },
      {}
    );

    this.alertaConfiguracionTemporal = {
      genera_alerta: true,
      valores_alerta,
      peso: 1
    };
  }

  private initClasificacionForm(): FormGroup {
    return this.formBuilder.group({
      color: ['#000000'],
      nombre: [''],
      rango_maximo: [0],
      rango_minimo: [0],
      planes_cuidado: this.formBuilder.array([])
    });
  }

  agregarPlanCuidadoAlerta(clasificacionIndex: number) {
    const clasificacion = this.clasificacionesForm.at(clasificacionIndex);
    if (!clasificacion) {
      console.error('No se encontró la clasificación');
      return;
    }

    const planesCuidado = clasificacion.get('planes_cuidado') as FormArray;
    if (!planesCuidado) {
      console.error('No se encontró el FormArray de planes de cuidado');
      return;
    }

    planesCuidado.push(
      this.formBuilder.group({
        descripcion: ['']
      })
    );
  }

  eliminarPlanCuidadoAlerta(clasificacionIndex: number, planIndex: number) {
    const clasificacion = this.clasificacionesForm.at(clasificacionIndex);
    const planesCuidado = clasificacion.get('planes_cuidado') as FormArray;
    planesCuidado.removeAt(planIndex);
  }

  getPlanesCuidado(clasificacionIndex: number): FormArray {
    const clasificacion = this.clasificacionesForm.at(clasificacionIndex);
    return clasificacion.get('planes_cuidado') as FormArray;
  }

  getAlertaValor(value: any, opcionValue: string): string {
    return value?.alerta?.valores_alerta?.[opcionValue]?.valor || '';
  }

  hasAlertaValor(value: any, opcionValue: string): boolean {
    return !!value?.alerta?.valores_alerta?.[opcionValue]?.valor;
  }

  hasPlanesCuidado(value: any, opcionValue: string): boolean {
    return (
      (value?.alerta?.valores_alerta?.[opcionValue]?.planes_cuidado?.length ||
        0) > 0
    );
  }

  getPlanesCuidadoList(value: any, opcionValue: string): string[] {
    return value?.alerta?.valores_alerta?.[opcionValue]?.planes_cuidado || [];
  }

  detectarFormatoExcel(contenido: string): boolean {
    const lineas = contenido.trim().split('\n');
    if (lineas.length < 2) return false;

    return lineas.every(linea => {
      const columnas = linea.trim().split(/\t|\s{2,}/);
      return columnas.length === 2;
    });
  }

  transformarExcelAJson() {
    try {
      const lineas = this.contenidoExcel.trim().split('\n');
      const opciones = lineas.map(linea => {
        const [value, option] = linea.trim().split(/\t|\s{2,}/);
        return { value: value.trim(), option: option.trim() };
      });

      const jsonString = JSON.stringify(opciones, null, 2);
      this.formulario.patchValue({ optionsJSON: jsonString });
      this.esFormatoExcel = false;
      this.contenidoExcel = '';

      this.onOptionsJSONChange();
    } catch (error) {
      console.error('Error al transformar Excel a JSON:', error);
    }
  }

  onOptionsJSONChange() {
    try {
      const contenido = this.formulario.get('optionsJSON')?.value;
      if (!contenido) {
        this.esFormatoExcel = false;
        return;
      }

      try {
        JSON.parse(contenido);
        this.esFormatoExcel = false;
      } catch {
        this.esFormatoExcel = this.detectarFormatoExcel(contenido);
        if (this.esFormatoExcel) {
          this.contenidoExcel = contenido;
        }
      }
    } catch (error) {
      console.error('Error al procesar el contenido:', error);
    }
  }

  public editarCategoriaSeleccionada() {
    const categoriaSeleccionada = this.formulario.get('grupo')?.value;
    if (!categoriaSeleccionada) {
      this.toastr.warning('Por favor seleccione una categoría para editar');
      return;
    }

    const categoriaEncontrada = this.grupos.find(
      g => g.id === Number(categoriaSeleccionada)
    );
    if (!categoriaEncontrada) {
      this.toastr.error('No se encontró la categoría seleccionada');
      return;
    }

    this.indexEditar = 1;
    this.modalFormTipoFicha.reset();

    const tipo = this.tipoCards.find(
      tipo => tipo.nombre === this.formulario.value.fichaTipo
    );
    const tipoData = this.tipoData[tipo?.nombre || 'grupalNombre'];
    const categorias = this.formularioGenerado[tipoData];
    const categoriaFormulario = categorias.find(
      categoria => categoria.id === Number(categoriaSeleccionada)
    );

    const ubicacionActual =
      categorias.findIndex(
        categoria => categoria.id === Number(categoriaSeleccionada)
      ) + 1;

    const clasificaciones = this.modalFormTipoFicha.get(
      'alerta.clasificaciones'
    ) as FormArray;
    clasificaciones.clear();

    if (categoriaFormulario?.alerta?.clasificaciones) {
      categoriaFormulario.alerta.clasificaciones.forEach(
        (clasificacion: any) => {
          const planesCuidado = (clasificacion.planes_cuidado || []).map(
            (plan: any) => {
              if (typeof plan === 'object' && plan.descripcion) {
                return plan.descripcion;
              }
              return plan;
            }
          );

          clasificaciones.push(
            this.formBuilder.group({
              nombre: [clasificacion.nombre],
              rango_minimo: [clasificacion.rango_minimo],
              rango_maximo: [clasificacion.rango_maximo],
              color: [clasificacion.color],
              planes_cuidado: this.formBuilder.array(
                planesCuidado.map((plan: string) =>
                  this.formBuilder.group({ descripcion: [plan] })
                )
              )
            })
          );
        }
      );
    }

    this.modalFormTipoFicha.patchValue({
      nombre: categoriaEncontrada.title,
      tipoFicha: this.formulario.value.fichaTipo,
      ubicacion: ubicacionActual,
      alerta: {
        genera_alerta: categoriaFormulario?.alerta?.genera_alerta || false,
        clasificaciones: clasificaciones.value
      }
    });

    this.modalService.open(this.contentTipoFicha, {
      ariaLabelledBy: 'modal-title'
    });
  }

  public guardarEdicionCategoria(modalTipoFicha: any) {
    const categoriaSeleccionada = this.formulario.get('grupo')?.value;
    if (!categoriaSeleccionada) {
      this.toastr.error('No hay categoría seleccionada para editar');
      return;
    }

    if (this.modalFormTipoFicha.valid) {
      const clasificaciones = this.modalFormTipoFicha.get(
        'alerta.clasificaciones'
      ) as FormArray;
      this.validarRangos(clasificaciones);

      if (
        clasificaciones.controls.some(
          control =>
            control.get('rango_minimo')?.errors ||
            control.get('rango_maximo')?.errors
        )
      ) {
        this.toastr.error('Hay errores en los rangos de las clasificaciones');
        return;
      }

      const categoriaEncontrada = this.grupos.find(
        g => g.id === Number(categoriaSeleccionada)
      );
      if (!categoriaEncontrada) {
        this.toastr.error('No se encontró la categoría seleccionada');
        return;
      }

      const tipo = this.tipoCards.find(
        tipo => tipo.nombre === this.formulario.value.fichaTipo
      );
      if (!tipo?.tipo) {
        this.toastr.error('No se encontró el tipo de ficha');
        return;
      }

      const tipoData = this.tipoData[tipo.nombre];
      const categorias = this.formularioGenerado[tipoData];
      const categoriaIndex = categorias.findIndex(
        cat => cat.id === Number(categoriaSeleccionada)
      );

      if (categoriaIndex !== -1) {
        const clasificacionesTransformadas = clasificaciones.value.map(
          (clasificacion: any) => ({
            ...clasificacion,
            planes_cuidado: clasificacion.planes_cuidado.map(
              (plan: any) => plan.descripcion
            )
          })
        );

        const nuevaUbicacion = this.modalFormTipoFicha.value.ubicacion - 1;

        if (nuevaUbicacion !== categoriaIndex) {
          const categoria = categorias.splice(categoriaIndex, 1)[0];
          categorias.splice(nuevaUbicacion, 0, categoria);
        }

        categorias[nuevaUbicacion] = {
          ...categorias[nuevaUbicacion],
          title: this.modalFormTipoFicha.value.nombre,
          alerta: this.modalFormTipoFicha.value.alerta.genera_alerta
            ? {
                genera_alerta: true,
                clasificaciones: clasificacionesTransformadas
              }
            : undefined
        };

        this.guardarFormulario();
        modalTipoFicha.close('Guardado');
        this.toastr.success('Categoría actualizada correctamente');
      } else {
        this.toastr.error('No se encontró la categoría en el formulario');
      }
    }
  }

  public obtenerCategoria(steper: ICategoria): ICategoria {
    return steper;
  }

  public get posicionesDisponibles(): number[] {
    const tipo = this.tipoCards.find(
      tipo => tipo.nombre === this.formulario.value.fichaTipo
    );
    if (!tipo?.tipo) return [];

    const tipoData = this.tipoData[tipo.nombre];
    const categorias = this.formularioGenerado[tipoData];
    return Array.from({ length: categorias.length }, (_, indice) => indice + 1);
  }

  public alternarVisibilidadAlerta(indice: number): void {
    this.alertasVisibles[indice] = !this.alertasVisibles[indice];
  }
}
