import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
  faBoxes,
  faChartLine,
  faHome,
  faSignOut,
  faStore,
  faTags,
  faUser,
  faUsers, faWarehouse
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit,AfterViewInit{
  public user: any = null;
  @ViewChild('sidebar') sidebar: ElementRef | undefined;

  isSuperAdmin=false;
  paths = [
    {
      route: '/dashboard/evenements',
      icon: 'dashboard',
      label: 'Client',
      profile: 'USER',
    },
    {
      route: '/dashboard/users',
      icon: 'table_view',
      label: 'Mes Boutiques',
      profile: 'SUPERADMIN',
    }

  ];
  signout= 'logout';
  home= faHome;


  ngOnInit(): void {
    if (this.authService.fetchFromSessionStorage() !== null){
      this.user = this.authService.fetchFromSessionStorage();
      console.log("user",this.user)
      if(this.user.profile=='SUPERADMIN'){
        this.isSuperAdmin=true;
      }
    }
    else this.router.navigateByUrl('/login');
    console.log()
    if (this.user.profile === 'USER')
      this.paths = this.paths.filter((path) => path.profile === this.user.profile);
    else if (this.user.profile === 'ADMIN') {
      // ADMIN sees all paths except boutique
      this.paths = this.paths.filter(path =>  path.label !== 'Client');
    }

  }


  ngAfterViewInit() {
    if (this.authService.fetchFromSessionStorage() !== null){
      this.user = this.authService.fetchFromSessionStorage();
      console.log("this.user",this.user)
    }


  }
  constructor(private authService: AuthService, private router: Router,private renderer: Renderer2 ) {
  }

  signOut() {
    this.authService.logout();
  }

}
