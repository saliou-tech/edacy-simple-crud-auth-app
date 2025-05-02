import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, pipe, tap, throwError} from "rxjs";
import {environment} from "../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EventService} from "./event.service";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authServiceUrl = `${environment.protocol}${environment.applicationUrl}`;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private eventServie: EventService
  ) {}



  login(formData: any) {
    return this.http
      .post<User>(`${this.authServiceUrl}/auth/login`, formData)
      .pipe(tap((user: User) => {
        this.saveToSessionStorage(user);
        console.log("user just after loggged",user)
        this.eventServie.loggedInUser.next(user);
      }));
  }

  saveToSessionStorage(user: User) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  fetchFromSessionStorage(): User | null {
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
  clearSessionStorage() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('user');
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  getRole(): string | undefined {
    return this.fetchFromSessionStorage()?.role;
  }

  isAuthenticated(): boolean {
    const token = this.fetchFromSessionStorage()?.token ?? null;
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  redirectIfLoggedIn() {
    if (this.fetchFromSessionStorage()?.token) {
      this.router.navigate(['/dashboard']);
    }
  }

  /*  refreshTokenRequest(): Observable<any> {



      return this.http.post<any>(`${this.authServiceUrl}/auth/refresh-token`, requestBody).pipe
      (tap((user: User) => {
        this.saveToSessionStorage(user);
        this.eventServie.loggedInUser.next(user);
      }));
    }*/


  refreshToken(): Observable<any> {
    const user = this.fetchFromSessionStorage();

    if (!user || !user.token) {
      // Handle the case where there is no user or token
      console.error('No user or token available');
      return throwError('No token available');
    }

    // Prepare the request body
    const requestBody: any = {};
    if (!user.refreshToken) {
      requestBody.username = user.username; // Include username if no refresh token
    } else {
      requestBody.refreshToken = user.refreshToken;
    }

    console.log('Sending request with body:', requestBody);
    // Implement your logic to request a new access token using the refresh token
    return this.http.post<any>(`${this.authServiceUrl}/auth/refresh-token`, requestBody).pipe(
      tap((user: User) => {
        this.saveToSessionStorage(user);
        this.eventServie.loggedInUser.next(user);
      }));

  }
}
