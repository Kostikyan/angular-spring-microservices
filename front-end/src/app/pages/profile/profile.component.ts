import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../http.service";
import {environment} from "../../../environments/environment";
import {FormsModule} from "@angular/forms";
import {ProfileService} from "./profile.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  id!: number;

  user: any;

  name!: string;
  surname!: string;
  phone!: string;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpService,
              private service: ProfileService,
              private toastr: ToastrService
              ) {
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.http.get(environment.localhost + environment.users + this.id)
      .subscribe(res => {
        console.log(res);
        this.user = res;

        this.name = this.user.name;
        this.surname = this.user.surname;
        this.phone = this.user.phone;
      })
  }

  showPopup(popup: any) {
    if(popup.classList.contains('hidden')) {
      popup.classList.remove('hidden');
    } else {
      popup.classList.add('hidden');
    }
  }

  edit(popup: any) {
    let body = {
      id: this.user.id,
      name: this.name,
      surname: this.surname,
      phone: this.phone
    }

    this.service.edit(body)
      .subscribe(res => {
        this.user = res;

        this.name = this.user.name;
        this.surname = this.user.surname;
        this.phone = this.user.phone;

        popup.classList.add('hidden');
        this.toastr.success("Data successfully edited!");
      });
  }
}
