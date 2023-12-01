import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../http.service";
import {environment} from "../../../environments/environment";
import {FormsModule} from "@angular/forms";
import {ProfileService} from "./profile.service";
import {ToastrService} from "ngx-toastr";
import {timeout} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  id!: number;

  user: any;

  name!: string;
  surname!: string;
  phone!: string;

  selectedFiles!: FileList;
  currentFile!: File;

  profilePictureName!: string;

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
        this.user = res;
        this.profilePictureName = this.user.profilePicture ? `/assets/images/user/${this.user.profilePicture}` : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
        this.name = this.user.name;
        this.surname = this.user.surname;
        this.phone = this.user.phone;
      })
  }

  showPopup(popup: any) {
    if (popup.classList.contains('hidden')) {
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

  changeImg(popup: any) {
    this.currentFile = this.selectedFiles.item(0) as File;
    this.service.changeImg(this.currentFile, this.user.id)
      .subscribe((res: any) => {
        this.profilePictureName = res.profilePicture;
        popup.classList.add('hidden');
        this.toastr.success("Profile picture successfully changed!");
        setTimeout(() => {}, 2000);
        window.location.reload();
      });
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
}
