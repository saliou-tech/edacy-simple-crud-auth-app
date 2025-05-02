import { Injectable } from '@angular/core';
import {environment} from "./environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  evenementUrl = `${environment.protocol}${environment.applicationUrl}`;

  constructor(private http: HttpClient) {}
  getAllEvenements(): Observable<any[]> {
    return this.http.get<any[]>(this.evenementUrl);
  }

  createEvenement(event: any): Observable<any> {
    return this.http.post(this.evenementUrl, event);
  }

  updateEvenement(id: string, event: any): Observable<any> {
    return this.http.put(`${this.evenementUrl}/${id}`, event);
  }

  deleteEvenement(id: string): Observable<any> {
    return this.http.delete(`${this.evenementUrl}/${id}`);
  }
}
