import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  rror: any ;
  erroField=false;
  isAdmin: any;
  userLogin: any;
  currentUser: any;
  loading = false;
  isUsernameShort=false;
  showSpinner=false;
  success :any;
  message : string | undefined;

  ngOnInit(): void {
    this.userLogin={
      email:'',
      password:''
    }
  }
  constructor(private router: Router,private snackBar: MatSnackBar ,private userService:AuthService,public dialog: MatDialog) { }


  openSnackBar(message: string, action: string,className: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: [className]


    });
  }

  logAdmin(){
    this.loading = true;
    this.showSpinner=true;

    this.userService.login(this.userLogin).subscribe(
      (data: any) => {
        console.log(data)
        this.currentUser={
          data:data,
          nom:this.userLogin.email,

        }
        this.openSnackBar("Connexion reussi", "close","green-snackbar")
        //JSON.stringify(this.currentUser.data)
        localStorage.setItem('user',JSON.stringify(this.currentUser))
        this.loading = false;
        this.showSpinner=false;
        this.router.navigate(['dashboard']);

        /*if (data.needsPasswordChange) {
          this.openDialog()
        } else {
          this.router.navigate(['dashboard']);
        }*/

      },
      (error:any) => {
        console.log("error",error);
        this.erroField=true;
        //  console.log(error.error.description);
        this.message = error.error.description;
        this.showSpinner=false;

      }
    )
  }
  /*openDialog() {

    this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      height: '500px',
      // data: { row: row }
    });
  }*/


}
