import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";
import {EvenementService} from "../evenement.service";

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css'
})
export class EvenementComponent  implements AfterViewInit,OnInit{
  stores=[];
  displayedColumns: string[] = ['id', 'nom', 'description' ,'lieu',"actions"];
  // @ts-ignore
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  protected nomBoutique="";

  plus =faPlus;
  categories :any =[]
  private categoryAddedSub: Subscription | undefined;

  private categoryDeleted: Subscription | undefined;

  private isopenDialogue: boolean=false;
  private categoriesByStores: any;
  private user: any | null;
  isAuthorizedTodeleteAndEdit: boolean=false;
  protected isAdmin=false;
  private store_id: any;
  // protected readonly plus = faPlus;
  boutiques: any  ;
  private selectedBoutique_id: any;
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }
  constructor(private evenementService: EvenementService) {}

  fetchEvenements() {
    this.evenementService.getAllEvenements().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error('Failed to load events', err)
    });
  }
  createEvenement(eventData: any) {
    this.evenementService.createEvenement(eventData).subscribe({
      next: () => this.fetchEvenements(),
      error: (err) => console.error('Error creating event', err)
    });
  }
  deleteEvenement(id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.evenementService.deleteEvenement(id).subscribe({
        next: () => this.fetchEvenements(),
        error: (err) => console.error('Error deleting event', err)
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

// Example stub if you plan to implement modal dialog
  openDialog() {
    // Open your event creation dialog here
  }

}
