import { IUserDetail } from '../../interface/user';
import { UsersService } from '../../services/user/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class UserComponent {
  public showAlert = false;
  public alertMessage = '';
  public alertType = 'success';

  constructor(private usersService: UsersService, private router: Router) {}

  private showNotification(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      if (type === 'success') {
        this.router.navigate(['/usuarios']);
      }
    }, 2000);
  }

  public createNewUser(userData: IUserDetail) {
    this.usersService.createUser(userData).subscribe(
      response => {
        this.showNotification('Usuario creado exitosamente', 'success');
      },
      (error: any) => {
        this.showNotification('Error al crear el usuario', 'danger');
        console.error('Error al crear el usuario', error);
      }
    );
  }
}
