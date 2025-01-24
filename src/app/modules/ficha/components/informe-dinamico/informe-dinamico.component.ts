import { Component, OnInit } from '@angular/core';
import { IVersiones } from 'src/app/helpers/interface/interface';
import { FormulariosService } from 'src/app/modules/formularios/services/formularios.service';
import {
  IFamilyCard,
  IFiltrosBusqueda,
  ITarjetaRespondidas
} from 'src/app/modules/generador/interfaces/interface';
import { InputsService } from 'src/app/modules/generador/services/inputs.service';

@Component({
  selector: 'app-informe-dinamico',
  templateUrl: './informe-dinamico.component.html',
  styleUrls: ['./informe-dinamico.component.scss']
})
export class InformeDinamicoComponent implements OnInit {
  public fichaJson!: IFamilyCard;
  public versiones: IVersiones[] = [];
  public versionSeleccionada: string = '';
  public tarjetasRespondidas: ITarjetaRespondidas[] = [];

  constructor(
    private formulariosService: FormulariosService,
    private inputsService: InputsService
  ) {}

  ngOnInit(): void {
    this.cargarFichasVersiones();
  }

  private cargarFichasVersiones(): void {
    this.formulariosService
      .obtenerVersiones(true)
      .subscribe((resultado: IVersiones[]) => {
        this.versiones = resultado;
      });
  }

  public cargarTipoFichas(): void {
    this.inputsService
      .obtenerFormularioJson(Number(this.versionSeleccionada))
      .subscribe(response => {
        this.fichaJson = response.data;
      });
  }

  public filtrar(filtros: IFiltrosBusqueda[]): void {
    this.formulariosService.obtenerInformes(filtros).subscribe(resultado => {
      this.tarjetasRespondidas = resultado;
    });
  }
}
