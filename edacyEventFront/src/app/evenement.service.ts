import { Injectable } from '@angular/core';
import {environment} from "./environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  serviceUrl = `${environment.protocol}${environment.applicationUrl}`;

  private evenementAddedSource = new Subject<void>();
  private evenementDeletedSource = new Subject<void>();

  // Observable streams
  evenementAdded$ = this.evenementAddedSource.asObservable();
  evenementDeleted$ = this.evenementDeletedSource.asObservable();
  constructor(private http: HttpClient) {}
  notifyEvenementAdded() {
    this.evenementAddedSource.next();
  }

  notifyEvenementDeleted() {
    this.evenementDeletedSource.next();
  }

  fetchAllEvenements() {
    return this.http.get(this.serviceUrl + '/event/all');
  }

  addEvenement(formData: any) {

    return this.http.post(this.serviceUrl + '/event/save', formData);
  }

  deleteEvenement(formData: any) {
    console.log("formData", formData);
    return this.http.post(this.serviceUrl + '/event/delete', formData, { responseType: 'text' });
  }

}
