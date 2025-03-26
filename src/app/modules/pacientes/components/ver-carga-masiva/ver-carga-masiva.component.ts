import { Component, OnInit } from '@angular/core';
import { CargasService } from '../../services/cargas/cargas.service';
import {
  ICargaResponse,
  IRegistroCarga
} from '../../services/cargas/cargas.service';
import { FormulariosService } from 'src/app/modules/formularios/services/formularios.service';
import { IVersiones } from 'src/app/helpers/interface/interface';

@Component({
  selector: 'app-ver-carga-masiva',
  templateUrl: './ver-carga-masiva.component.html',
  styleUrls: ['./ver-carga-masiva.component.scss']
})
export class VerCargaMasivaComponent implements OnInit {
  public registros: IRegistroCarga[] = [];
  public paginaActual: number = 1;
  public registrosPorPagina: number = 10;
  public totalRegistros: number = 0;
  public totalPaginas: number = 0;
  public cargando: boolean = false;
  public versiones: IVersiones[] = [];
  public versionSeleccionada: string = '';

  // Campos a excluir de la tabla
  private camposExcluidos: string[] = ['id', 'ficha_id'];

  constructor(
    private cargasService: CargasService,
    private formulariosService: FormulariosService
  ) {}

  ngOnInit(): void {
    this.cargarVersiones();
    this.cargarRegistros();
  }

  private cargarVersiones(): void {
    this.formulariosService
      .obtenerVersiones(false)
      .subscribe((resultado: IVersiones[]) => {
        this.versiones = resultado;
      });
  }

  public cargarRegistros(): void {
    if (!this.versionSeleccionada) return;

    this.cargando = true;
    this.cargasService
      .listarRegistrosCargados(
        Number(this.versionSeleccionada),
        this.paginaActual,
        this.registrosPorPagina
      )
      .subscribe({
        next: response => {
          this.registros = response.data.rows;
          this.totalRegistros = response.data.count;
          this.totalPaginas = response.data.totalPages;
          this.cargando = false;
        },
        error: error => {
          console.error('Error al cargar registros:', error);
          this.cargando = false;
        }
      });
  }

  public obtenerColumnas(): string[] {
    if (this.registros.length === 0) return [];

    // Obtener todas las columnas del primer registro
    const todasLasColumnas = Object.keys(this.registros[0]);

    // Filtrar las columnas excluyendo las que no queremos mostrar
    return todasLasColumnas.filter(
      columna => !this.camposExcluidos.includes(columna)
    );
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
    if (
      pagina >= 1 &&
      pagina <= this.totalPaginas &&
      pagina !== this.paginaActual
    ) {
      this.paginaActual = pagina;
      this.cargarRegistros();
    }
  }

  public cambiarLimite(): void {
    this.paginaActual = 1;
    this.cargarRegistros();
  }
}
