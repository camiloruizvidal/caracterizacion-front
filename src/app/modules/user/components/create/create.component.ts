import { IUserDetail } from '../../interface/user';
import { UsersService } from '../../services/user/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class UserComponent {
  constructor(private usersService: UsersService) {}

  public createNewUser(userData: IUserDetail) {
    this.usersService.createUser(userData).subscribe(
      response => {
        console.log('Usuario creado exitosamente', response);
      },
      (error: any) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }
}
