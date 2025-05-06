import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {} from '@angular/core';
import {EvenementService} from "../evenement.service";
// @ts-ignore
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
const FIELDS = [
  { key: 'nom', message: "Veuillez remplir le nom de la Evenement" },
  { key: 'description', message: "Veuillez remplir la description de la Evenement" },
  { key: 'lieu', message: "Veuillez remplir l'adresse de la Evenement" },
  { key: 'Date', message: "Veuillez remplir le numéro de téléphone de la Evenement" },
  { key: 'nombrePlace', message: "Veuillez donnez le logo  de la Evenement" },



];
// @ts-ignore
@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrl: './evenement-form.component.css'
})
export class EvenementFormComponent implements OnInit{
  evenement: any = {
    id: '',
    nom: '',
    description: '',
    lieu :'',
    nombrePlace: ''
  };

  showSpinner = false
  erroField = false;
  message: String = '';
  isshowDeleteDialog = false;
  isfilename=false;
  ngOnInit(): void {
    this.evenement = {
      id: '',
      nom: '',
      description: '',
      lieu: '',
      nombrePlace: ''
    }
    if (this.data.row) {
      this.evenement.id = this.data.row.id || '';
      this.evenement.nom = this.data.row.nom || '';
      this.evenement.description = this.data.row.description || '';
      this.evenement.lieu = this.data.row.lieu || '';
      this.evenement.nombrePlace = this.data.row.nombrePlace || '';


    }
    if (this.data.isopenDialogue) {
      this.isshowDeleteDialog = this.data.isopenDialogue
    }
  }



  constructor(private evenementService: EvenementService,
              private router: Router,
              private snackBar: MatSnackBar
    , public dialogRef: MatDialogRef<EvenementFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: [className]


    });
  }

  supprimerEvenement() {
    // Your delete logic here
    console.log('Supprimer Evenement', this.evenement);

    this.showSpinner = true;

    this.evenementService.deleteEvenement(this.evenement).subscribe(
      (res: any) => {
        this.showSpinner = false;
        if (res === "Evenement Supprimé avec succes") {
          this.openSnackBar("Suppression effectuée", "close", "red-snackbar");
          this.evenementService.notifyEvenementDeleted(); // Notify the event
          this.dialogRef.close();
          this.router.navigate(['/dashboard/evenements']);
        } else {
          this.openSnackBar( res, "close", "red-snackbar");
          this.evenementService.notifyEvenementDeleted(); // Notify the event
          this.dialogRef.close();
          this.router.navigate(['/dashboard/evenements']);

        }
      },
      (error: any) => {
        console.log("error", error);
        this.erroField = true;
        this.message = error.error.description || "An error occurred";
        this.showSpinner = false;
      }
    );
  }
  cancelEvenement() {
    console.log('Cancel Evenement');
    this.dialogRef.close();
  }
  saveEvenement() {
    this.showSpinner = true;
    for (let field of FIELDS) {
      if (this.evenement[field.key] == '') {
        this.message = field.message;
        this.erroField = true;
        break;
      } else {
        // this.evenement.logo=this.fileName;
        //this.evenement.file.fichier=this.selectedFile;
        // this.evenement.file.fileName=this.fileName
        this.evenementService.addEvenement(this.evenement).subscribe((res) => {
            this.showSpinner = false;
            this.openSnackBar("Evenement ajoutéé avec success", "close", "green-snackbar")
            this.evenementService.notifyEvenementAdded(); // Notify the event

            this.dialogRef.close();

            this.router.navigate(['/dashboard/evenements']);
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




  }
