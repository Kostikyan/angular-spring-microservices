import {Injectable} from '@angular/core';
import {HttpService} from "../../http.service";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpService) {
    }

    getAllUsers() {
        return this.http.get(environment.localhost + environment.users + "all");
    }
}
