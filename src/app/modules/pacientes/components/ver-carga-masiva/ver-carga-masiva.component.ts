import { Component, OnInit } from '@angular/core';
import { CargasService } from '../../services/cargas/cargas.service';
import { ICargaResponse } from '../../services/cargas/cargas.service';

@Component({
  selector: 'app-ver-carga-masiva',
  templateUrl: './ver-carga-masiva.component.html',
  styleUrls: ['./ver-carga-masiva.component.scss']
})
export class VerCargaMasivaComponent implements OnInit {
  public registros: any[] = [];
  public paginaActual: number = 1;
  public registrosPorPagina: number = 10;
  public totalRegistros: number = 0;
  public totalPaginas: number = 0;
  public cargando: boolean = false;

  constructor(private cargasService: CargasService) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  public cargarRegistros(): void {
    this.cargando = true;
    this.cargasService
      .listarRegistrosCargados(8, this.paginaActual, this.registrosPorPagina)
      .subscribe({
        next: response => {
          console.log({ response });
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

  public cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.cargarRegistros();
  }
}
