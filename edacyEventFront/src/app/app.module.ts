import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthRoutingModule } from './auth/auth-routing.module'
import {AuthModule} from "./auth/auth.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "./auth/auth.service";
import {JwtTokenInterceptor} from "./intercepors/jwt-token.interceptor";
import {CorsInterceptor} from "./intercepors/cors.interceptor";
import {SharedModule} from "./shared/shared.module";
import { EvenementComponent } from './evenement/evenement.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import {MatPaginator} from "@angular/material/paginator";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSort} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatTooltip} from "@angular/material/tooltip";
@NgModule({
  declarations: [
    AppComponent,
    EvenementComponent,
    UtilisateursComponent,
    EvenementFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AuthRoutingModule,
    MatDatepickerModule,
    AuthModule,
    DashboardModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatInputModule,
    SharedModule,
    MatPaginator,
    MatFormField,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatHeaderRow,
    MatRow,
    MatInput,
    MatButton,
    FontAwesomeModule,
    MatTable,
    MatColumnDef,
    MatSort,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatCellDef,
    MatHeaderCellDef,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatProgressBar,
    MatDialogContent,
    MatTooltip
  ],

  providers: [
    AuthService,

    provideAnimationsAsync(),

    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true,
    },    // Other providers if any
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
