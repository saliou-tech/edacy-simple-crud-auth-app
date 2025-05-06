import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatDialogActions} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatError,
        FormsModule,
        MatProgressBar,
        MatDialogActions,
        MatLabel,
        MatFormField,
        MatSelect,
        MatOption,
        MatInput,
        MatButton
    ]
})
export class AuthModule { }
