import { IPagination } from 'src/app/helpers/interface/interface';
import { FormulariosService } from './../../../services/formularios.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'enviroment/enviroment';

@Component({
  selector: 'app-listado-masivo',
  templateUrl: './listado-masivo.component.html',
  styleUrls: ['./listado-masivo.component.scss']
})
export class ListadoMasivoComponent implements OnInit {
  public isLoading: boolean = false;
  public forms!: IPagination<any>;

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

  get exportarTarjetas(): string {
    return `${environment.apiUrl}/v1/ficha/informecompleto`;
  }
}
