import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) {
  }

  login(body: any): Observable<any> {
    let path = environment.localhost + environment.login;
    let post = this.http.post(path, body);

    post.subscribe((res: any) => {
      if (res) {
        this.setToken(res?.token);
        this.setCurrentUser(res);
        this.route.navigate(['home']).then().catch();
      } else {
        this.toastr.error('Invalid user credentials');
      }
    })

    return post;
  }

  register(body: any): boolean {
    let path = environment.localhost + environment.register;
    let post = this.http.post(path, body);

    post.subscribe((res: any) => {
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
