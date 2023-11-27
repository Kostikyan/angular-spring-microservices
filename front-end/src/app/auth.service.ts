import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  logout() {
    sessionStorage.clear();
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getCurrentUser(): any {
    return JSON.parse(sessionStorage.getItem('currentUser')!);
  }

  setCurrentUser(user: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

}
