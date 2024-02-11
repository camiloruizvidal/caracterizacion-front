import { IPagination } from 'src/app/helpers/interface/interface';
import { FormulariosService } from './../../../services/formularios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-masivo',
  templateUrl: './listado-masivo.component.html',
  styleUrls: ['./listado-masivo.component.scss'],
})
export class ListadoMasivoComponent implements OnInit {
  public forms!: IPagination<any>;

  constructor(
    private formulariosService: FormulariosService,
  ) {}

  ngOnInit(): void {
    this.loadForms();
  }

  public loadForms(page: number = 1, pageSize: number = 10): void {
    this.formulariosService
      .obtenerFormularios(page, pageSize)
      .subscribe((response) => {
        this.forms = response;
      });
  }

  public changePagination(value: {
    itemsPerPage: number;
    currentPage: number;
  }): void {
    this.loadForms(value.currentPage, value.itemsPerPage);
  }

}
