import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.auth.getToken())

    constructor(private http: HttpClient, private auth: AuthService) {
    }

    get(url: string) {
        return this.http.get(url, this.getOptions);
    }

    post(url: string, body: any) {
        return this.http.post(url, body, this.getOptions);
    }

    put(url: string, body: any) {
        return this.http.post(url, body, this.getOptions);
    }

    get getOptions() {
        return {headers: this.headers};
    }
}
