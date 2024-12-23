import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { HelpersModule } from 'src/app/helpers/helpers.module';
import { FormComponent } from './components/form/form/form.component';

@NgModule({
  declarations: [
    UserComponent,
    ListComponent,
    EditComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    HttpClientModule,
    HelpersModule
  ]
})
export class UserModule { }
