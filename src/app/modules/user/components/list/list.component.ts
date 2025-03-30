import { UsersService } from './../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { IRols, IUserDetail } from '../../interface/user';
import { IPagination } from 'src/app/helpers/interface/interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public usersPagination!: IPagination<IUserDetail>;
  public roles: IRols[] = [];
  public searchForm: FormGroup;
  public registrosPorPagina: number = 10;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      textoBuscar: [''],
      rolId: ['']
    });
  }

  public ngOnInit(): void {
    this.loadPaginationUsers();
    this.loadRols();
  }

  private loadRols(): void {
    this.usersService.getRols().subscribe((roles: IRols[]) => {
      this.roles = roles;
    });
  }

  public loadPaginationUsers(page: number = 1, pageSize: number = 10): void {
    const rolId: number =
      this.searchForm.value.rolId === ''
        ? 0
        : Number(this.searchForm.value.rolId);
    this.usersService
      .getUsers(page, pageSize, rolId, this.searchForm.value.textoBuscar)
      .subscribe((response: IPagination<IUserDetail>) => {
        this.usersPagination = response;
        this.registrosPorPagina = pageSize;
      });
  }

  public changePagination(value: {
    itemsPerPage: number;
    currentPage: number;
  }): void {
    this.loadPaginationUsers(value.currentPage, value.itemsPerPage);
  }

  public obtenerPaginas(): number[] {
    const paginas: number[] = [];
    const maxPaginas = 5; // Número máximo de páginas a mostrar

    let inicio = Math.max(
      1,
      this.usersPagination.currentPage - Math.floor(maxPaginas / 2)
    );
    let fin = Math.min(
      this.usersPagination.totalPages,
      inicio + maxPaginas - 1
    );

    // Ajustar el inicio si estamos cerca del final
    if (fin - inicio + 1 < maxPaginas) {
      inicio = Math.max(1, fin - maxPaginas + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  }
}
