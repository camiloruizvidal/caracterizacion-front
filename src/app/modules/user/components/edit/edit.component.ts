import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { IUserDetail } from '../../interface/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private id!: number;
  public user!: IUserDetail;
  public showAlert = false;
  public alertMessage = '';
  public alertType = 'success';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

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

  public loadUser(): void {
    this.usersService.getUser(this.id).subscribe(
      (user: IUserDetail) => {
        this.user = user;
      },
      error => {
        this.showNotification('Error al cargar el usuario', 'danger');
        console.error('Error al cargar el usuario', error);
      }
    );
  }

  public editUser(userData: IUserDetail) {
    this.usersService.updateUser(this.id, userData).subscribe(
      response => {
        this.showNotification('Usuario actualizado exitosamente', 'success');
      },
      (error: any) => {
        this.showNotification('Error al actualizar el usuario', 'danger');
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
}
