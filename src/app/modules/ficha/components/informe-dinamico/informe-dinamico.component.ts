import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IVersiones,
  EEstadoGeneracionExcel
} from 'src/app/helpers/interface/interface';
import { FormulariosService } from 'src/app/modules/formularios/services/formularios.service';
import {
  IFormulario,
  IFiltrosBusqueda,
  ITarjetaRespondidas
} from 'src/app/modules/generador/interfaces/interface';
import { InputsService } from 'src/app/modules/generador/services/inputs.service';
import { IRespuesta } from 'src/app/core/interfaces/global.interface';
import { DataService } from 'src/app/modules/filtro-maps/services/data/data.service';
import { IUserDetail } from 'src/app/modules/user/interface/user';
import { UsersService } from 'src/app/modules/user/services/user/users.service';

interface IEstadisticaCaracterizador {
  caracterizador_id: number;
  caracterizador_nombre: string;
  caracterizador_documento: string;
  ficha_nombre: string;
  ficha_version: number;
  mes: string;
  total_fichas: number;
}

interface IRespuestaEstadisticas {
  count: number;
  totalPages: number;
  rows: IEstadisticaCaracterizador[];
}

@Component({
  selector: 'app-informe-dinamico',
  templateUrl: './informe-dinamico.component.html',
  styleUrls: ['./informe-dinamico.component.scss']
})
export class InformeDinamicoComponent implements OnInit, OnDestroy {
  private intervalId: any;
  public EEstadoGeneracionExcel = EEstadoGeneracionExcel;
  public fichaJson!: IFormulario;
  public versiones: IVersiones[] = [];
  public versionSeleccionada: string = '';
  public tarjetasRespondidas: ITarjetaRespondidas[] = [];
  public paginaActual: number = 1;
  public registrosPorPagina: number = 10;
  public totalRegistros: number = 0;
  public totalPaginas: number = 0;

  // Propiedades para la tabla de registros a exportar
  public registrosExportacion: any[] = [];
  public paginaActualExportacion: number = 1;
  public registrosPorPaginaExportacion: number = 10;
  public totalRegistrosExportacion: number = 0;
  public totalPaginasExportacion: number = 0;

  // Propiedades para la tabla de caracterizadores
  public versionSeleccionadaCaracterizadores: string = '';
  public caracterizadorSeleccionado: number = 0;
  public caracterizadores: IUserDetail[] = [];
  public estadisticasCaracterizadores: IRespuestaEstadisticas = {
    count: 0,
    totalPages: 0,
    rows: []
  };
  public paginaActualCaracterizadores: number = 1;
  public registrosPorPaginaCaracterizadores: number = 10;
  public totalRegistrosCaracterizadores: number = 0;
  public totalPaginasCaracterizadores: number = 0;

  constructor(
    private formulariosService: FormulariosService,
    private inputsService: InputsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.cargarFichasVersiones();
    this.cargarCaracterizadores();
  }

  private cargarFichasVersiones(): void {
    this.formulariosService
      .obtenerVersiones(true)
      .subscribe((resultado: IVersiones[]) => {
        this.versiones = resultado;
      });
  }

  private cargarCaracterizadores(): void {
    this.usersService.getUsers(1, 1000000, 2, '').subscribe(response => {
      this.caracterizadores = response.data;
    });
  }

  public cargarTipoFichas(): void {
    this.inputsService
      .obtenerFormularioJson(Number(this.versionSeleccionada))
      .subscribe(response => {
        this.fichaJson = response.data;
        this.cargarRegistrosExportacion();
      });
  }

  public cargarRegistrosExportacion(): void {
    if (this.versionSeleccionada) {
      this.formulariosService
        .obtenerRegistrosExportacion(
          Number(this.versionSeleccionada),
          this.paginaActualExportacion,
          this.registrosPorPaginaExportacion
        )
        .subscribe(response => {
          this.registrosExportacion = response.data.data;
          this.totalRegistrosExportacion = response.data.totalItems;
          this.totalPaginasExportacion = response.data.totalPages;
          this.verificarYConfigurarRecarga();
        });
    }
  }

  private verificarYConfigurarRecarga(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    const hayRegistrosEnProceso = this.registrosExportacion.some(
      registro => registro.estado === this.EEstadoGeneracionExcel.EN_PROCESO
    );

    if (hayRegistrosEnProceso) {
      this.intervalId = setInterval(() => {
        this.cargarRegistrosExportacion();
      }, 1000);
    }
  }

  public cambiarPaginaExportacion(pagina: number): void {
    this.paginaActualExportacion = pagina;
    this.cargarRegistrosExportacion();
  }

  public cambiarLimiteExportacion(): void {
    this.paginaActualExportacion = 1;
    this.cargarRegistrosExportacion();
  }

  public obtenerPaginasExportacion(): number[] {
    const paginas: number[] = [];
    const { totalPaginasExportacion, paginaActualExportacion } = this;

    for (
      let i = Math.max(1, paginaActualExportacion - 5);
      i <= Math.min(paginaActualExportacion + 5, totalPaginasExportacion);
      i++
    ) {
      paginas.push(i);
    }
    return paginas;
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

  // Métodos para la tabla de caracterizadores
  public cargarTipoFichasCaracterizadores(): void {
    this.cargarEstadisticasCaracterizadores();
  }

  public cargarEstadisticasCaracterizadores(): void {
    const fichaVersion = this.versionSeleccionadaCaracterizadores
      ? Number(this.versionSeleccionadaCaracterizadores)
      : undefined;
    const caracterizadorId = this.caracterizadorSeleccionado;

    this.formulariosService
      .obtenerEstadisticasCaracterizadores(
        fichaVersion,
        this.paginaActualCaracterizadores,
        this.registrosPorPaginaCaracterizadores,
        caracterizadorId
      )
      .subscribe((response: IRespuesta<IRespuestaEstadisticas>) => {
        this.estadisticasCaracterizadores = response.data;
        this.totalRegistrosCaracterizadores = response.data.count;
        this.totalPaginasCaracterizadores = response.data.totalPages;
      });
  }

  public obtenerPaginasCaracterizadores(): number[] {
    const paginas: number[] = [];
    const maxPaginas = 5;

    let inicio = Math.max(
      1,
      this.paginaActualCaracterizadores - Math.floor(maxPaginas / 2)
    );
    let fin = Math.min(
      this.totalPaginasCaracterizadores,
      inicio + maxPaginas - 1
    );

    if (fin - inicio + 1 < maxPaginas) {
      inicio = Math.max(1, fin - maxPaginas + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  }

  public cambiarPaginaCaracterizadores(pagina: number): void {
    this.paginaActualCaracterizadores = pagina;
    this.cargarEstadisticasCaracterizadores();
  }

  public cambiarLimiteCaracterizadores(): void {
    this.paginaActualCaracterizadores = 1;
    this.cargarEstadisticasCaracterizadores();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
