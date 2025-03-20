import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesModule } from './modules/pacientes/pacientes.module';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  BrowserAnimationsModule,
  provideAnimations
} from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 100000 }),
    AppRoutingModule,
    PacientesModule,
    LoginModule,
    UserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
