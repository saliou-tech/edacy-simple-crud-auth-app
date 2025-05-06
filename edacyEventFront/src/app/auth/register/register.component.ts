import {Component, Inject, NgIterable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthService} from "../auth.service";
import {ManageUserService} from "../../manage-user.service";
const FIELDS = [
  { key: 'fullName', message: "Veuillez saisir ce champ"  },
  { key: 'email', message: "Veuillez saisir ce champ" },
  { key: 'address', message: "Veuillez saisir ce champ" },
  { key: 'telephone', message: "Veuillez saisir ce champ" },
  { key: 'profile', message: "Veuillez saisir ce champ" },

];
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  message: string | undefined;
  erroField: any;

  user={
    fullName: '',
    password: '',
    email: '',
    telephone: '',
    adresse:'',
    username:'',
    profile: ''

  }
  nomDepot: any;
  selectedStore: any;
  selectedRole: any;
  showSpinner: any;
  isshowDeleteDialog: any;
  stores: any[] = [];
  protected showComboboutique: boolean=false;

  constructor(
              private snackBar: MatSnackBar,
              private  router: Router,
              private manageUserService: ManageUserService,
              ){

  }

  ngOnInit(): void {
    this.user={
      fullName: '',
      password: '',
      email: '',
      telephone: '',
      adresse:'',
      username: '',
      profile: ''

    }    }

  saveUser() {
    this.showSpinner = true;
    this.user.profile=this.selectedRole

    console.log("user to save",this.user)
    for (let field of FIELDS) {
      // @ts-ignore
      if (this.user[field.key] == '') {
        this.message = field.message;
        this.erroField = true;
        break;
      } else {
        this.manageUserService.addUser(this.user).subscribe((res) => {
            this.showSpinner = false;
            this.openSnackBar("Store ajoutéé avec success", "close", "green-snackbar")
            this.manageUserService.notifyUserAdded(); // Notify the event


            this.router.navigate(['/dashboard/users']);
          },
          (error: any) => {
            console.log("error", error);
            this.erroField = true;
            console.log(error.error.description);
            this.message = error.error.description;
            this.showSpinner = false;

          }
        );
      }


    }


  }

  openSnackBar(message: string, action: string,className: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: [className]


    });
  }
  cancelUser() {

  }


}
