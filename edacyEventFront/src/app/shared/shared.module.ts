import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent
  ],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class SharedModule { }
