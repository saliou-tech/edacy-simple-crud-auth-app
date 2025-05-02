import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../auth/auth.guard";
import {EvenementComponent} from "../evenement/evenement.component";
import {UtilisateursComponent} from "../utilisateurs/utilisateurs.component";


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'evenements', component: EvenementComponent },
      { path: 'users', component: UtilisateursComponent }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
