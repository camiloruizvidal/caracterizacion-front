import { UsersService } from './../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { IRols, IUserDetail } from '../../interface/user';
import { IPagination } from 'src/app/helpers/interface/interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public usersPagination!: IPagination<IUserDetail>;
  public roles: IRols[] = [];
  public searchForm: FormGroup;

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
      });
  }

  public changePagination(value: {
    itemsPerPage: number;
    currentPage: number;
  }): void {
    this.loadPaginationUsers(value.currentPage, value.itemsPerPage);
  }
}
