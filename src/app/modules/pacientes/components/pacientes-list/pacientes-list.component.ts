import { Component } from '@angular/core';
import { IPagination } from 'src/app/helpers/interface/interface';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { IPacienteId } from '../../interface/pacientes';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.scss'],
})
export class PacientesListComponent {
  public patientPagination!: IPagination<IPacienteId>;
  public isShowUpload: boolean = false;

  constructor(private pacientesService: PacientesService) {}

  public ngOnInit(): void {
    this.loadPaginationPatients();
  }

  private loadPaginationPatients(
    page: number = 1,
    pageSize: number = 10
  ): void {
    this.pacientesService
      .getPatients(page, pageSize)
      .subscribe((response: IPagination<IPacienteId>) => {
        this.patientPagination = response;
      });
  }

  public changePagination(value: {
    itemsPerPage: number;
    currentPage: number;
  }): void {
    this.loadPaginationPatients(value.currentPage, value.itemsPerPage);
  }

  public changeShowUpload(isShow: boolean) {
    this.isShowUpload = isShow
  }
}