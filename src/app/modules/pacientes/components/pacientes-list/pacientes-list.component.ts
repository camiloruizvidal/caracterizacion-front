import { Component } from '@angular/core';
import { IPagination } from 'src/app/helpers/interface/interface';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { IPacienteId } from '../../interface/pacientes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalContent } from 'src/app/modules/helpers/modal.component/ngb-modal-content.component';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.scss']
})
export class PacientesListComponent {
  public patientPagination!: IPagination<IPacienteId>;
  public isShowUpload: boolean = false;
  public selectedFile: File | null = null;
  public estaSubiendoArchivo: boolean = false;

  constructor(
    private pacientesService: PacientesService,
    private modalService: NgbModal
  ) {}

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

  public onUpload() {
    this.estaSubiendoArchivo = true;
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('pacientes', this.selectedFile, 'pacientes');
      this.pacientesService.sendFile(formData).subscribe(
        (response: { message: string }) => {
          this.estaSubiendoArchivo = false;
          const modalRef = this.modalService.open(NgbModalContent, {
            centered: true,
            backdrop: 'static',
            keyboard: false
          });

          modalRef.componentInstance.titulo = '¡Proceso Completado!';
          modalRef.componentInstance.mensaje = response.message;
        },
        error => {
          this.estaSubiendoArchivo = false;
        }
      );
    }
  }

  public changePagination(value: {
    itemsPerPage: number;
    currentPage: number;
  }): void {
    this.loadPaginationPatients(value.currentPage, value.itemsPerPage);
  }

  public changeShowUpload(isShow: boolean) {
    this.isShowUpload = isShow;
  }

  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
