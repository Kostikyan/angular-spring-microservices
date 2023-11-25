import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name = '';
  surname = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private toastr: ToastrService, private auth: AuthService, private router: Router) {
  }

  submitRegister() {
    if (!this.filter()) {
      return;
    }

    let body = {
      name: this.name,
      surname: this.surname,
      phone: this.phone,
      email: this.email,
      password: this.password
    }

    let isOk = this.auth.register(body);
    if (!isOk) {
      this.toastr.error('Something gone wrong!')
    } else {
      this.router.navigate(['home']).catch().then();
    }

  }

  filter(): boolean {

    if (!this.name) {
      this.toastr.error("Name cannot be empty!")
      return false;
    }
    if (!this.surname) {
      this.toastr.error("Surname cannot be empty!")
      return false;
    }
    if (!this.phone) {
      this.toastr.error("Phone cannot be empty!")
      return false;
    }

    let isUsernameEmpty: boolean = (this.email == '') || (typeof this.email == 'undefined') || (typeof this.email == null);
    let isPasswordEmpty: boolean = (this.password == '') || (typeof this.password == 'undefined') || (typeof this.password == null);
    if (isUsernameEmpty) {
      this.toastr.error("Username cannot be empty!")
      return false;
    }
    if (isPasswordEmpty) {
      this.toastr.error("Password cannot be empty!")
      return false;
    }

    let regex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    let isRightEmailPattern = regex.test(this.email as string);
    if (!isRightEmailPattern) {
      this.toastr.error("Invalid email format! (ex: example@gmail.com)")
      return false;
    }

    let isPasswordRight = this.password!.length >= 5;
    if (!isPasswordRight) {
      this.toastr.error("The password must contain at least 5 letters")
      return false;
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error("Password and password confirmation do not match")
      return false;
    }

    return true
  }
}
