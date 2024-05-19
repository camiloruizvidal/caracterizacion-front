import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFamilyCard, IGruposFicha } from '../../interfaces/interface';

type TipoForm = 'familyCard' | 'personCard';

@Component({
  selector: 'app-is-visible',
  templateUrl: './is-visible.component.html',
  styleUrls: ['./is-visible.component.scss']
})
export class IsVisibleComponent {
  @Input() public formulario!: FormGroup;
  @Input() public formularioGenerado!: IFamilyCard;
  @Input() public grupos: IGruposFicha[] = [];

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
}
