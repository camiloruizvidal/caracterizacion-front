import {
  EFileStatus,
  IResultadoGenerarArchivoExcel
} from './../../../../../helpers/interface/interface';
import { IPagination } from 'src/app/helpers/interface/interface';
import { FormulariosService } from './../../../services/formularios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-masivo',
  templateUrl: './listado-masivo.component.html',
  styleUrls: ['./listado-masivo.component.scss']
})
export class ListadoMasivoComponent implements OnInit {
  public isLoading: boolean = false;
  public forms!: IPagination<any>;
  public resultadoExcelGenerado!: IResultadoGenerarArchivoExcel;
  public estadoExcelGenerado!: EFileStatus;
  private timeoutId: any = null;

  constructor(private formulariosService: FormulariosService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  public loadForms(page: number = 1, pageSize: number = 10): void {
    this.forms = {
      data: [],
      totalItems: 1,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10
    };
    this.formulariosService
      .obtenerFormularios(page, pageSize)
      .subscribe(response => {
        this.forms = response;
      });
  }

  public changePagination(value: {
    itemsPerPage: number;
    currentPage: number;
  }): void {
    this.loadForms(value.currentPage, value.itemsPerPage);
  }
  public sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  public async cargarTarjetasNoSubidas(): Promise<void> {
    this.isLoading = true;
    this.formulariosService.procesarTarjetasUltimaVersion().subscribe(
      async () => {
        await this.sleep(5000);
        this.loadForms();
        this.isLoading = false;
      },
      async () => {
        await this.sleep(5000);
        this.loadForms();
        this.isLoading = false;
      }
    );
  }

  public exportarTarjetas() {
    return this.formulariosService
      .generarExcelTarjetasProcesadas()
      .subscribe((resultado: IResultadoGenerarArchivoExcel) => {
        this.resultadoExcelGenerado = resultado;
        this.descargarTarjetasExcel(this.resultadoExcelGenerado.fileName);
        this.timeoutId = setTimeout((): void => {
          this.descargarTarjetasExcel(this.resultadoExcelGenerado.fileName);
        }, 3000);
      });
  }

  private descargarTarjetasExcel(fileName: string) {
    this.formulariosService.validarEstadoExcel(fileName).subscribe(
      (resultado: { estado: EFileStatus }) => {
        this.estadoExcelGenerado = resultado.estado;
        if (this.estadoExcelGenerado === EFileStatus.COMPLETED) {
          window.open(this.resultadoExcelGenerado.url, '_blank');
        }
      },
      error => {
        alert(
          'No se pudo generar el archivo. Error inexperado. "' +
            error.message +
            '"'
        );
        console.log({ error });
        clearTimeout(this.timeoutId);
      }
    );
  }
}
