
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {environment} from "./environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ManageUserService {
  authServiceUrl = `${environment.protocol}${environment.applicationUrl}`;
  private userAddedSource = new Subject<void>();
  private userDeletedSource = new Subject<void>();

  // Observable streams
  userAdded$ = this.userAddedSource.asObservable();
  userDeleted$ = this.userDeletedSource.asObservable();

  constructor(private http: HttpClient) {}
  notifyUserAdded() {
    this.userAddedSource.next();
  }

  notifyUserDeleted() {
    this.userDeletedSource.next();
  }
  fetchAllUsers() {
    return this.http.get(`${this.authServiceUrl}/users/allUsers`);
  }

  /*fetchuserByPointDeVente(formData: any) {
    return this.http.put(`${this.authServiceUrl}/register`, formData);
  }*/
  fetchuserByPointDeVente(id: any) {

    return this.http.get(this.authServiceUrl + '/users/userByPointDeVente/' + id);
  }

  addUser(formData: any) {
    console.log("aaded user",formData)
    return this.http.post(`${this.authServiceUrl}/auth/signup`, formData);
  }
  fetchConnectedUser() {
    return this.http.get(`${this.authServiceUrl}/users/me`);
  }

  fetchById(id: any) {
    return this.http.get(`${this.authServiceUrl}/register/${id}`);
  }
}
