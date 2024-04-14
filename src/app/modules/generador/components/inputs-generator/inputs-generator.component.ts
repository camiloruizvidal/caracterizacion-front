import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IFamilyCard,
  IGruposFicha,
  ISteperValues
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

  ngOnInit(): void {
    this.cargarFormulario(2);
    this.cargarGrupos();
    this.cargarTipos();
  }

  private cargarFormulario(id: number) {
    this.inputsService.obtenerFormularioJson(id).subscribe(response => {
      this.formularioGenerado = response.data;
    });
  }

  private cargarTipos() {
    this.tipos = Object.keys(ESteperType);
  }

  private cargarGrupos() {
    this.inputsService
      .obtenerGruposFichas()
      .subscribe((result: IGruposFicha[]) => {
        this.grupos = result;
      });
  }

  public get isValidForm(): boolean {
    return (
      this.formulario.value.fichaTipo.trim() !== '' &&
      this.formulario.value.grupo.trim() !== '' &&
      this.formulario.value.label.trim() !== ''
    );
  }
  public agregar() {
    if (this.isValidForm) {
      const steperValues: ISteperValues = {
        label: this.formulario.value.label.trim(),
        type: this.formulario.value.tipo,
        options: this.getOptions(),
        default: null,
        visibility: true,
        required: this.formulario.value.esRequerido,
        columnName: this.crearNombreColumna(),
        value: null
      };

      const fichaTipo: TipoForm = this.formulario.value.fichaTipo as TipoForm;
      let index = this.agregarGrupoAForm(
        this.formulario.value.grupo,
        fichaTipo
      );
      this.formularioGenerado[fichaTipo][index].values?.push(steperValues);

      this.formulario.value.label = '';
      this.guardarFormulario();
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  private getOptions() {
    return ['selectFilter', 'select_multiple', 'select'].includes(
      this.formulario.value.tipo
    )
      ? []
      : null;
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

  public editar(tipo: string, index: number, value: any) {
    //console.log({ tipo, index, value });
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
        fichaOld.orden < fichaCurrenly.orden ? 1 : -1
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
}
