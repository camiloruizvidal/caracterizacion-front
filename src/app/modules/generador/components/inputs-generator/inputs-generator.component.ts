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

      label: ['', Validators.required],
      description: [null],
      type: [''],
      options: [null],
      default: [null],
      visibility: [true],
      required: [false],
      value: null
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
      let index = -1;
      const steperValues: ISteperValues = {
        label: this.formulario.value.label,
        type: this.formulario.value.tipo,
        options: null,
        default: null,
        visibility: true,
        required: this.formulario.value.esRequerido,
        value: null
      };

      if (this.formulario.value.fichaTipo === 'familyCard') {
        index = this.formularioGenerado.familyCard.findIndex(
          value => value.id === Number(this.formulario.value.grupo)
        );
        this.formularioGenerado.familyCard[index].values?.push(steperValues);
      } else if (this.formulario.value.fichaTipo === 'personCard') {
        index = this.formularioGenerado.personCard.findIndex(
          value => value.id === Number(this.formulario.value.grupo)
        );
        this.formularioGenerado.personCard[index].values?.push(steperValues);
      }
      debugger;
      //this.formulario.reset();
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  private crearNombreColumna(steperValues: ISteperValues) {}

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

  public guardarFormulario() {
    this.inputsService
      .guardarFormulario(this.formularioGenerado)
      .subscribe(response => {
        console.log({ response });
      });
  }

  public agregarGrupo() {
    if (this.agregarGrupoForm.valid) {
      console.log(this.agregarGrupoForm.value)
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
