import { IGruposFicha } from './../../interfaces/interface';
import { InputsService } from './../../services/inputs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inputs-generator',
  templateUrl: './inputs-generator.component.html',
  styleUrls: ['./inputs-generator.component.scss']
})
export class InputsGeneratorComponent {
  public grupos: IGruposFicha[] = [];
  constructor(private inputsService: InputsService) {}

  ngOnInit(): void {
    this.cargarGrupos();
  }

  private cargarGrupos() {
    this.inputsService
      .obtenerGruposFichas()
      .subscribe((result: IGruposFicha[]) => {
        this.grupos = result;
      });
  }
}
