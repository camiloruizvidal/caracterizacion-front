import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IFamilyCard,
  IGruposFicha,
  ISteperValues,
  IStepers
} from './../../interfaces/interface';
import { InputsService } from './../../services/inputs.service';
import { Component, OnInit } from '@angular/core';
import { ESteperType } from 'src/app/helpers/interface/interface';
import { v4 as uuid } from 'uuid';
import { ToastrService } from 'ngx-toastr';

type TipoForm = 'familyCard' | 'personCard';

@Component({
  selector: 'app-inputs-generator',
  templateUrl: './inputs-generator.component.html',
  styleUrls: ['./inputs-generator.component.scss']
})
export class InputsGeneratorComponent implements OnInit {
  public grupos: IGruposFicha[] = [];
  public formulario: FormGroup;
  public agregarGrupoForm: FormGroup;
  public tipos: string[] = [];
  public formularioGenerado!: IFamilyCard;
  public esEditable: boolean = false;
  private indexEditar: number = -1;
  public tipoCards: { nombre: TipoForm; tituloTexto: string }[] = [
    { nombre: 'familyCard', tituloTexto: 'Tarjeta Familiar' },
    { nombre: 'personCard', tituloTexto: 'Tarjeta Personal' }
  ];
  public typesOptions: string[] = ['selectFilter', 'select_multiple', 'select'];

  constructor(
    private formBuilder: FormBuilder,
    private inputsService: InputsService,
    private toastr: ToastrService
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
      nombre_columna: [''],

      fichaTipoVisible: [''],
      grupoVisible: ['']
    });

    this.agregarGrupoForm = this.formBuilder.group({
      nuevoFichaTipo: ['', Validators.required],
      nombreGrupo: ['', Validators.required]
    });
  }
  //#region temporal
  public ngOnInit(): void {
    this.cargarFormulario(2);
    this.cargarGrupos();
    this.cargarTipos();
    setInterval(() => {
      this.cargarFormulario(2);
    }, 2000);
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
    });
  }

  private cargarTipos() {
    this.tipos = Object.keys(ESteperType).sort();
  }

  private cargarGrupos() {
    this.inputsService
      .obtenerGruposFichas()
      .subscribe((result: IGruposFicha[]) => {
        this.grupos = result;
      });
  }

  private getTipo() {
    return this.formulario.value.tipo === ESteperType.CheckSiNo
      ? ESteperType.Check
      : this.formulario.value.tipo;
  }

  public agregar(): void {
    if (this.isValidForm) {
      const fichaTipo: TipoForm = this.formulario.value.fichaTipo as TipoForm;
      let index = this.agregarGrupoAForm(
        this.formulario.value.grupo,
        fichaTipo
      );
      const orden = this.formularioGenerado[fichaTipo][index].values?.length;
      const steperValues: ISteperValues = {
        label: this.formulario.value.label.trim(),
        type: this.getTipo(),
        options: this.getOptions(),
        visibility: true,
        required: this.formulario.value.esRequerido,
        columnName: this.crearNombreColumna(),
        default: this.formulario.value.default,
        value: null,
        orden
      };
      this.formularioGenerado[fichaTipo][index].values?.push(steperValues);

      this.formulario.value.label = '';
      this.guardarFormulario();
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  public getOptions() {
    let options;
    if (this.formulario.value.tipo === ESteperType.CheckSiNo) {
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
    let index = this.formularioGenerado[tipoForm].findIndex(
      value => value.id === Number(this.formulario.value.grupo)
    );
    if (index === -1) {
      const grupo = this.grupos.find(grupo => grupo.id === Number(tipoGrupo));
      if (grupo) {
        this.formularioGenerado[tipoForm].push({
          ...grupo,
          values: []
        });
        index = this.formularioGenerado[tipoForm].findIndex(
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
    value: ISteperValues,
    indexCard: number,
    tarjeta: TipoForm
  ) {
    console.log({
      nuevoOrden: Number(nuevoOrden.target.value),
      ordenAnterior: Number(value.orden),
      indexCard,
      tarjeta,
      form: JSON.parse(
        JSON.stringify(this.formularioGenerado[tarjeta][indexCard].values)
      )
    });

    const ordenAnterior = Number(value.orden);
    const items = this.formularioGenerado[tarjeta][indexCard]?.values;

    if (items && Array.isArray(items)) {
      const item = items[ordenAnterior];
      items.splice(ordenAnterior, 1);
      items.splice(Number(nuevoOrden.target.value), 0, item);
      this.actualizarOrden();
    } else {
      console.error('items is undefined or not an array');
    }
  }

  public actualizarOrden() {
    const tipos: TipoForm[] = ['familyCard', 'personCard'];
    tipos.forEach((tipo: TipoForm) => {
      this.formularioGenerado[tipo].map((item: IStepers, index: number) => {
        let orden = 0;
        item.orden = index;
        return item.values?.map(items => {
          items.orden = orden;
          orden = orden + 1;
          return items;
        });
      });
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

  public editar(tipo: TipoForm, index: number, indexValue: number, value: any) {
    this.formulario.patchValue({
      fichaTipo: tipo,
      tipo: value.type,
      options: value.options,
      label: value.label,
      grupo: this.formularioGenerado[tipo][index].id,
      default: this.formulario.value.default
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
    this.indexEditar = indexValue;
    this.esEditable = true;
  }

  public guardarEdicion() {
    const tipo: TipoForm = this.formulario.value.fichaTipo as TipoForm;

    const indexGrupo = this.formularioGenerado[tipo].findIndex(
      value => value.id === Number(this.formulario.value.grupo)
    );

    const values =
      this.formularioGenerado?.[tipo]?.[indexGrupo]?.values?.[this.indexEditar];

    if (values) {
      values.label = this.formulario.value.label.trim();
      values.options = this.getOptions();
      values.type = this.getTipo();
      values.visibility = true;
      values.required = this.formulario.value.esRequerido;
      values.default = this.formulario.value.default;
      this.guardarFormulario();
      this.esEditable = false;
    }
  }

  public eliminar(tipo: string, index: number, indexValue: number, value: any) {
    const tipoForm: TipoForm = tipo as TipoForm;
    this.formularioGenerado[tipoForm][index].values?.splice(indexValue, 1);

    if (this.formularioGenerado[tipoForm][index].values?.length === 0) {
      this.formularioGenerado[tipoForm].splice(index, 1);
    }

    this.inputsService
      .guardarFormulario(this.formularioGenerado)
      .subscribe(response => {
        this.toastr.error(
          'Se actualizó el formulario',
          'El nuevo item ha sido eliminado'
        );
      });
  }

  public getValue(key: string, value: any): any {
    return value[key] as any;
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

  public agregarGrupo() {
    if (this.agregarGrupoForm.valid) {
      this.inputsService
        .crearGrupo({
          title: this.agregarGrupoForm.value.nombreGrupo,
          ficha_tipo_id: Number(this.agregarGrupoForm.value.nuevoFichaTipo)
        })
        .subscribe(response => {
          this.cargarGrupos();
          this.toastr.success(
            'Se actualizó el grupo',
            'El grupo ha sido agregado'
          );
        });
    }
  }

  public selectAllText(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  public obtenerTipoInput(value: string): string {
    const values = ESteperType as any;
    return values[value];
  }

  public get gruposFiltrado(): any[] {
    let tipoid: number = 0;
    switch (this.formulario.value.fichaTipo) {
      case 'familyCard':
        tipoid = 1;
        break;
      case 'personCard':
        tipoid = 2;
        break;
    }
    return this.grupos
      .filter(grupo => grupo.ficha_tipo_id === tipoid)
      .sort((fichaOld, fichaCurrenly) =>
        fichaOld.title.toLowerCase().trim() >
        fichaCurrenly.title.toLowerCase().trim()
          ? 1
          : -1
      );
  }

  public get gruposVisiblesFiltrado(): any[] {
    let tipoid: number = 0;
    switch (this.formulario.value.fichaTipoVisible) {
      case 'familyCard':
        tipoid = 1;
        break;
      case 'personCard':
        tipoid = 2;
        break;
    }
    return this.grupos.filter(grupo => grupo.ficha_tipo_id === tipoid);
  }

  public get camposVisibles(): any[] {
    try {
      const fichaTipo: TipoForm = this.formulario.value.fichaTipoVisible;

      return (
        this.formularioGenerado[fichaTipo].find(
          (ficha: any) =>
            ficha.id === Number(this.formulario.value.grupoVisible)
        )?.values || []
      );
    } catch (error) {
      return [];
    }
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
}
