import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = '';
  private currentUser = null;

  constructor(private http: HttpClient) {
  }

  login(body: any): Observable<any> {
    let path = environment.localhost + environment.login;
    let post = this.http.post(path, body);

    post.subscribe((res: any) => {
      if (res) {
        this.setToken(res?.token);
        this.setCurrentUser(res);
      }
    })

    return post;
  }

  register(body: any): boolean {
    let path = environment.localhost + environment.register;
    let post = this.http.post(path, body);

    post.subscribe((res: any) => {
      this.setToken(res?.token);
      this.setCurrentUser(res);
      return true;
    }, error => {
      return false;
    });

    return true;
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken(): void {
    this.token = '';
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  clearCurrentUser() {
    this.currentUser = null;
  }
}
