import { Injectable } from '@angular/core';
import {HttpService} from "../../http.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpService) { }

  edit(body: any) {
    return this.http.post(environment.localhost + environment.users + 'edit', body);
  }
}
