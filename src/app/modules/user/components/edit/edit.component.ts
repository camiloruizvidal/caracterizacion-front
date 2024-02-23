import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { IUserDetail } from '../../interface/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private id!: number;
  public user!: IUserDetail;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    this.usersService.getUser(this.id).subscribe((user: IUserDetail) => {
      this.user = user;
    });
  }

  public editUser(userData: IUserDetail) {
    this.usersService.updateUser(this.id, userData).subscribe(
      response => {
        console.log('Usuario creado exitosamente', response);
      },
      (error: any) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }
}
