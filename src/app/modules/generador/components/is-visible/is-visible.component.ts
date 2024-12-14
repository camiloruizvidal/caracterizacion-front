import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ESteperType,
  IFamilyCard,
  IGruposFicha,
  IOptionsVisibility,
  typeRule
} from '../../interfaces/interface';

type TipoForm = 'grupalNombre' | 'individualNombre';

@Component({
  selector: 'app-is-visible',
  templateUrl: './is-visible.component.html',
  styleUrls: ['./is-visible.component.scss']
})
export class IsVisibleComponent implements OnInit {
  public formulario: FormGroup;
  public tipoCampo: ESteperType = ESteperType.Text;
  public regla!: IOptionsVisibility;
  @Input() public formularioGenerado!: IFamilyCard;
  @Input() public grupos: IGruposFicha[] = [];

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      fichaTipoVisible: ['', Validators.required],
      grupoVisible: ['', Validators.required],
      campoVisible: ['', Validators.required],
      condicion: ['', Validators.required],
      campo: ['', Validators.required],

      rango_inicio: [''],
      rango_fin: ['']
    });
  }

  ngOnInit(): void {
    console.log({ formularioGenerado: this.formularioGenerado });
    const rangoInicioControl = this.formulario.get('rango_inicio');
    if (rangoInicioControl) {
      rangoInicioControl.valueChanges.subscribe(value => {
        this.filtrarCampos();
      });
    }

    const rangoFinControl = this.formulario.get('rango_fin');
    if (rangoFinControl) {
      rangoFinControl.valueChanges.subscribe(value => {
        this.filtrarCampos();
      });
    }
    const campo = this.formulario.get('campo');
    if (campo) {
      campo.valueChanges.subscribe(value => {
        this.tipoCampo = this.validarTipoDato(value);
      });
    }
  }
  public get gruposVisiblesFiltrado(): any[] {
    let tipoid: number = 0;
    if (!this.formulario) {
      return [];
    }
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

  public get camposVisibles(): any[] {
    return [];
    //    try {
    //      const fichaTipo: TipoForm = this.formulario.value.fichaTipoVisible;
    //      return (
    //        this.formularioGenerado[fichaTipo].find(
    //          (ficha: any) =>
    //            ficha.id === Number(this.formulario.value.grupoVisible)
    //        )?.values || []
    //      );
    //    } catch (error) {
    //      return [];
    //    }
  }

  public guardarVisibilidad(): void {
    this.formulario;
    console.log({ formulario: this.formulario });
  }

  private validarTipoDato(columna: string): ESteperType {
    const fichaTipoVisible: any = this.formulario.value.fichaTipoVisible;
    const formularioGenerado: any = this.formularioGenerado;

    const values = formularioGenerado[fichaTipoVisible].find(
      (form: any) => form.id === Number(this.formulario.value.grupoVisible)
    ).values;

    const item = values.find((item: any) => item.columnName === columna);

    return item.type as ESteperType;
  }

  public filtrarGrupos(target: EventTarget | null) {}

  public filtrarCampos() {
    const columna = this.formulario.value.campo;
    this.tipoCampo = this.validarTipoDato(columna);
    let rule: typeRule;
    let value;
    if (this.tipoCampo === ESteperType.Calendar) {
      value = {
        minAnnos: Number(this.formulario.value.rango_inicio),
        maximoAnos: Number(this.formulario.value.rango_fin)
      };
      rule = 'rangoFecha';
    } else {
      value = '';
      rule = '=';
    }

    console.log({ tipo: this.tipoCampo });
    this.regla = {
      isDepent: true,
      rules: [
        {
          rule,
          columnDepend: columna,
          value: JSON.stringify(value)
        }
      ],
      isShow: true
    };
    console.log({ target: this.regla });
  }
}
