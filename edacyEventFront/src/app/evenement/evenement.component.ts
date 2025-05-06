import {AfterViewInit,ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";
import {EvenementService} from "../evenement.service";
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {EvenementFormComponent} from "../evenement-form/evenement-form.component";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvenementComponent  implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['id', 'nom', 'description', 'lieu', 'nombrePlace',"actions"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  plus =faPlus;
  evenements :any =[]
  private evenementAddedSub: Subscription | undefined;

  private evenementDeleted: Subscription | undefined;

  private isopenDialogue: boolean=false;
  private user: any | null;
  protected isAuthorizedTodeleteAndEditANDCREATE: boolean=false;
  protected imageUrl: string | undefined;



  ngOnInit(): void {
    if (this.authService.fetchFromSessionStorage() !== null){
      console.log("user",this.user)

        this.evenements = this.getAllEvenements();
        console.log("evenements",this.evenements)
        // this.imageUrl = this.evenementsService.getImageUrl(this.evenements.logo);
        console.log("imageUrl",this.imageUrl)

        this.evenementAddedSub = this.evenementService.evenementAdded$.subscribe(() => {
          this.getAllEvenements();
        });
        this.evenementDeleted = this.evenementService.evenementDeleted$.subscribe(() => {
          this.getAllEvenements();
        });
      }





  }
  constructor(public dialog: MatDialog,public evenementService: EvenementService,private authService:AuthService,
              private router:Router) {

    // @ts-ignore
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.dataSource._updateChangeSubscription();  // Ensure data source is updated after view initialization
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(row :any = null) {
    this.isopenDialogue=false;
    this.dialog.open(EvenementFormComponent, {
      width: '600px',
      height: '800px',
      data: { row: row }
    });
  }
  getAllEvenements(): void {
    this.evenementService.fetchAllEvenements().subscribe((data: any) => {
      this.evenements = data;
      this.dataSource.data = this.evenements;
      console.log('Depots loaded:', this.evenements);
    });
  }
  editEvenement(row:any) {
    console.log("row",row);
    this.openDialog(row);

  }
  deleteEvenement(row:any) {
    console.log("row",row);
    this.isopenDialogue=true;
    this.openDialogDelete(row,0,0);

  }

  openDialogDelete(row: any, enterAnimationDuration: any, exitAnimationDuration: any): void {

    this.dialog.open(EvenementFormComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { isopenDialogue: this.isopenDialogue, row: row }
    });
  }



// Example stub if you plan to implement modal dialog



}
