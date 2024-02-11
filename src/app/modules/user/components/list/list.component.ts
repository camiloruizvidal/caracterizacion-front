import { UsersService } from './../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { IUserDetail } from '../../interface/user';
import { IPagination } from 'src/app/helpers/interface/interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public usersPagination!: IPagination<IUserDetail>;

  constructor(private usersService: UsersService) {}

  public ngOnInit(): void {
    this.loadPaginationUsers();
  }

  private loadPaginationUsers() {
    this.usersService
      .getUsers()
      .subscribe((response: IPagination<IUserDetail>) => {
        this.usersPagination = response;
      });
  }
}