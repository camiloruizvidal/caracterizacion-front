import { Component, OnInit } from '@angular/core';
import { IVersiones } from 'src/app/helpers/interface/interface';
import { FormulariosService } from 'src/app/modules/formularios/services/formularios.service';
import {
  IFormulario,
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
  public fichaJson!: IFormulario;
  public versiones: IVersiones[] = [];
  public versionSeleccionada: string = '';
  public tarjetasRespondidas: ITarjetaRespondidas[] = [];
  public paginaActual: number = 1;
  public registrosPorPagina: number = 10;
  public totalRegistros: number = 0;
  public totalPaginas: number = 0;

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
    this.formulariosService
      .obtenerInformes(filtros, this.paginaActual, this.registrosPorPagina)
      .subscribe(response => {
        this.tarjetasRespondidas = response.data.rows;
        this.totalRegistros = response.data.count;
        this.totalPaginas = response.data.totalPages;
      });
  }

  public obtenerPaginas(): number[] {
    const paginas: number[] = [];
    const maxPaginas = 5; // Número máximo de páginas a mostrar

    let inicio = Math.max(1, this.paginaActual - Math.floor(maxPaginas / 2));
    let fin = Math.min(this.totalPaginas, inicio + maxPaginas - 1);

    // Ajustar el inicio si estamos cerca del final
    if (fin - inicio + 1 < maxPaginas) {
      inicio = Math.max(1, fin - maxPaginas + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  }

  public cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.filtrar([]);
  }

  public cambiarLimite(): void {
    this.paginaActual = 1;
    this.filtrar([]);
  }
}
