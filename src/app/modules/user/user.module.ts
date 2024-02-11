import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule
  ]
})
export class UserModule { }
