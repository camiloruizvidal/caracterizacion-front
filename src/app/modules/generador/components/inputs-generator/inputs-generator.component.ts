import { IVersiones } from './../../../../helpers/interface/interface';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {
  IOptionsVisibility,
  IOptionsVisibilityExtended,
  IPregunta,
  TipoDataForm,
  TipoForm,
  IFormulario,
  ETipoPregunta,
  ICategoria,
  IAlertaConfig
} from './../../interfaces/interface';
import { InputsService } from './../../services/inputs.service';
import { Component, OnInit } from '@angular/core';
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

  public alertasDisponibles: any[] = [];
  public tiposConAlertas = [
    ETipoPregunta.Check,
    ETipoPregunta.CheckSiNo,
    ETipoPregunta.Select,
    ETipoPregunta.SelectMultiple
  ];

  public jsonValido = true;
  public opcionesSelect: any[] = [];

  private alertaConfiguracionTemporal?: IAlertaConfig;

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
      alerta: this.formBuilder.group({
        genera_alerta: [false],
        clasificaciones: this.formBuilder.array([])
      })
    });

    // Suscribirse a cambios en optionsJSON
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

    // Suscribirse a cambios en el grupo seleccionado
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
    this.inputsService.obtenerFormularioJson(id).subscribe(response => {
      if (!this.deepEqual(this.formularioGenerado, response.data)) {
        this.formularioGenerado = response.data;
      }
      const navbarItems = document.querySelectorAll(
        '.navbar-items'
      ) as NodeListOf<HTMLElement>;
      navbarItems[0].click();
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
        // Limpiar alertas cuando se cambia el tipo de ficha
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
    // const ordenAnterior = Number(value.orden);
    // const items = this.formularioGenerado[tarjeta][indexCard]?.values;
    // if (items && Array.isArray(items)) {
    //   const item = items[ordenAnterior];
    //   items.splice(ordenAnterior, 1);
    //   items.splice(Number(nuevoOrden.target.value), 0, item);
    //   this.actualizarOrden();
    // } else {
    // }
  }

  public actualizarOrden() {
    const tipos: TipoForm[] = ['grupalNombre', 'individualNombre'];
    // tipos.forEach((tipo: TipoForm) => {
    //   this.formularioGenerado[tipo].map((item: ICategoria, index: number) => {
    //     let orden = 0;
    //     item.orden = index;
    //     return item.values?.map(items => {
    //       items.orden = orden;
    //       orden = orden + 1;
    //       return items;
    //     });
    //   });
    // });
    // this.guardarFormulario();
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

  public editar(tipo: TipoForm, index: number, indexValue: number, value: any) {
    // this.formulario.patchValue({
    //   fichaTipo: tipo,
    //   tipo: value.type,
    //   options: value.options,
    //   label: value.label,
    //   grupo: this.formularioGenerado[tipo][index].id,
    //   default: this.formulario.value.default
    // });
    // try {
    //   this.formulario.patchValue({
    //     optionsJSON: JSON.stringify(value.options, null, 2)
    //   });
    // } catch (error) {
    //   this.formulario.patchValue({
    //     optionsJSON: ''
    //   });
    // }
    // this.indexEditar = indexValue;
    // this.esEditable = true;
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

  public guardarEdicion() {
    const tipo: TipoForm = this.formulario.value.fichaTipo as TipoForm;

    // const indexGrupo = this.formularioGenerado[tipo].findIndex(
    //   value => value.id === Number(this.formulario.value.grupo)
    // );

    // const values =
    //   this.formularioGenerado?.[tipo]?.[indexGrupo]?.values?.[this.indexEditar];

    // if (values) {
    //   values.label = this.formulario.value.label.trim();
    //   values.options = this.getOptions();
    //   values.type = this.getTipo();
    //   values.visibility = true;
    //   values.required = this.formulario.value.esRequerido;
    //   values.default = this.formulario.value.default;
    //   this.guardarFormulario();
    //   this.esEditable = false;
    // }
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
    this.modalForm.reset(); // Limpiar el formulario al abrir
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

    console.log('tipo encontrado:', tipo);
    console.log('formulario:', this.formulario.value);
    console.log('modalFormTipoFicha:', this.modalFormTipoFicha.value);

    if (this.modalFormTipoFicha.valid && tipo?.tipo) {
      const grupoData = {
        nombre: this.modalFormTipoFicha.value.nombre,
        tipoFicha: tipo.tipo,
        version: this.formulario.value.version,
        alerta: this.modalFormTipoFicha.value.alerta.genera_alerta
          ? {
              genera_alerta: true,
              clasificaciones:
                this.modalFormTipoFicha.value.alerta.clasificaciones
            }
          : undefined
      };

      console.log('grupoData a enviar:', grupoData);

      this.formulariosService.crearNuevoGrupo(grupoData).subscribe({
        next: response => {
          console.log('Respuesta exitosa:', response);
          this.cargarGrupos();
          modalTipoFicha.close('Guardado');
        },
        error: error => {
          console.error('Error al guardar:', error);
        }
      });
    } else {
      console.log('Formulario no válido o tipo no encontrado');
      console.log('Validez del formulario:', this.modalFormTipoFicha.valid);
      console.log('Errores del formulario:', this.modalFormTipoFicha.errors);
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

  public get tipoData(): {
    grupalNombre: TipoDataForm;
    individualNombre: TipoDataForm;
  } {
    return {
      grupalNombre: 'grupalData',
      individualNombre: 'individualData'
    };
  }

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

  public guardarAlertas(
    reglasCondicionales: IOptionsVisibilityExtended[]
  ): void {
    return;
    const grupal = reglasCondicionales.filter(
      reglas => reglas.tipoAlerta === 'grupal'
    );
    const individual = reglasCondicionales.filter(
      reglas => reglas.tipoAlerta === 'individual'
    );

    const tipo = individual.length > 0 ? 'alertaGrupal' : 'alertaIndividual';
    this.formularioGenerado[tipo] = reglasCondicionales;
    reglasCondicionales.forEach(reglas => {
      this.formularioGenerado[tipo][reglas.indice] = reglas;
    });
  }

  // Getter para acceder fácilmente al FormArray de clasificaciones
  get clasificacionesArray() {
    return this.modalFormTipoFicha.get('alerta.clasificaciones') as FormArray;
  }

  // Método para agregar una clasificación
  agregarClasificacion() {
    const clasificaciones = this.modalFormTipoFicha.get(
      'alerta.clasificaciones'
    ) as FormArray;
    clasificaciones.push(
      this.formBuilder.group({
        nombre: ['', Validators.required],
        rango_minimo: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)]
        ],
        rango_maximo: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)]
        ],
        color: ['#000000']
      })
    );
  }

  // Método para eliminar una clasificación
  eliminarClasificacion(index: number) {
    this.clasificacionesArray.removeAt(index);
  }

  private cargarAlertasDeCategoria(grupoId: number) {
    console.log('Cargando alertas para grupo:', grupoId);
    const fichaTipo: TipoForm = this.formulario.value.fichaTipo as TipoForm;
    const campo: TipoDataForm = this.tipoData[fichaTipo] as TipoDataForm;

    console.log('Tipo de ficha:', fichaTipo);
    console.log('Campo:', campo);

    const categoria = this.formularioGenerado[campo]?.find(
      (cat: any) => cat.id === Number(grupoId)
    );

    console.log('Categoría encontrada:', categoria);
    console.log('Tiene alertas:', categoria?.alerta?.genera_alerta);
    console.log('Clasificaciones:', categoria?.alerta?.clasificaciones);

    if (
      categoria?.alerta?.genera_alerta &&
      categoria?.alerta?.clasificaciones
    ) {
      // Ordenamos las clasificaciones por rango_maximo de mayor a menor
      const clasificacionesOrdenadas = [
        ...categoria.alerta.clasificaciones
      ].sort((a, b) => b.rango_maximo - a.rango_maximo);

      console.log('Clasificaciones ordenadas:', clasificacionesOrdenadas);

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

      console.log('Alertas disponibles:', this.alertasDisponibles);
    } else {
      this.alertasDisponibles = [];
      console.log('No hay alertas disponibles');
    }
  }

  public mostrarConfiguracionAlertas(): boolean {
    const tipoActual = this.formulario.get('tipo')?.value;
    return this.tiposConAlertas.includes(tipoActual);
  }

  public onAlertasConfiguracion(config: any) {
    console.log('Configuración de alertas:', config);

    // Guardamos la configuración temporalmente
    this.alertaConfiguracionTemporal = {
      genera_alerta: true,
      valores_alerta: config,
      peso: 1
    };
  }
}
