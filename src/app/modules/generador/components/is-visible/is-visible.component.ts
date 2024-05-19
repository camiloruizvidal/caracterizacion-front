import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFamilyCard, IGruposFicha } from '../../interfaces/interface';

type TipoForm = 'familyCard' | 'personCard';

@Component({
  selector: 'app-is-visible',
  templateUrl: './is-visible.component.html',
  styleUrls: ['./is-visible.component.scss']
})
export class IsVisibleComponent {
  public formulario: FormGroup;
  @Input() public formularioGenerado!: IFamilyCard;
  @Input() public grupos: IGruposFicha[] = [];

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      fichaTipoVisible: ['', Validators.required],
      grupoVisible: ['', Validators.required],
      campoVisible: ['', Validators.required],
      condicion: ['', Validators.required]
    });
  }

  public get gruposVisiblesFiltrado(): any[] {
    let tipoid: number = 0;
    if (!this.formulario) {
      return [];
    }
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

  public guardarVisibilidad(): void {
    this.formulario;
    console.log({ formulario: this.formulario });
  }

  public filtrarCampos(target: EventTarget | null) {}
}
