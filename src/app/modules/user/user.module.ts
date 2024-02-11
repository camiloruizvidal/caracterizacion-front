import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    UserComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule
  ]
})
export class UserModule { }
