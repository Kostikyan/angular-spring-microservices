import {Injectable} from '@angular/core';
import {HttpService} from "../../http.service";
import {environment} from "../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpService) {
  }

  edit(body: any) {
    return this.http.post(environment.localhost + environment.users + 'edit', body);
  }

  changeImg(profilePicture: File, id: number) {
    const formData: FormData = new FormData();
    formData.append("file", profilePicture);

    return this.http.post(
      environment.localhost
      + environment.users
      + `change-profile-picture/${id}`,
      formData);
  }
}
