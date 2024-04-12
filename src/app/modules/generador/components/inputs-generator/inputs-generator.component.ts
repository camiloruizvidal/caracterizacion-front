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
    private inputsService: InputsService
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

      fichaTipoVisible: ['', Validators.required],
      grupoVisible: ['', Validators.required]
    });

    this.agregarGrupoForm = this.formBuilder.group({
      nuevoFichaTipo: ['', Validators.required],
      nombreGrupo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarFormulario(1);
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

  public agregar() {
    if (this.formulario.valid) {
      const steperValues: ISteperValues = {
        label: this.formulario.value.label,
        type: this.formulario.value.tipo,
        options: null,
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
    } else {
      this.formulario.markAllAsTouched();
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
    console.log({ tipo, index, value });
  }

  public eliminar(tipo: string, index: number) {
    console.log({ tipo, index });
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
    return this.grupos.filter(grupo => grupo.ficha_tipo_id === tipoid);
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

      this.formularioGenerado[fichaTipo];
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
        console.log({ response });
      });
  }

  public agregarGrupo() {
    if (this.agregarGrupoForm.valid) {
      console.log(this.agregarGrupoForm.value);
      this.inputsService
        .crearGrupo({
          title: this.agregarGrupoForm.value.nombreGrupo,
          ficha_tipo_id: Number(this.agregarGrupoForm.value.nuevoFichaTipo)
        })
        .subscribe(response => {
          this.cargarGrupos();
        });
    }
  }
}
