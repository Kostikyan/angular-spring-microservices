import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string | null | undefined = '';
  password: string | null | undefined = '';

  eyeClicked: boolean = false;

  constructor(private toastr: ToastrService, private auth: AuthService) {
  }

  clickEye(passwordInput: any) {
    if (this.eyeClicked) {
      this.eyeClicked = false;
      passwordInput.type = 'password'
    } else {
      this.eyeClicked = true;
      passwordInput.type = 'text'
    }
  }

  submitLogin() {
    if (!this.filter()) {
      return;
    }

    let body = {
      email: this.username,
      password: this.password
    }

    this.auth.login(body);
  }


  filter(): boolean {
    let isUsernameEmpty: boolean = (this.username == '') || (typeof this.username == 'undefined') || (typeof this.username == null);
    let isPasswordEmpty: boolean = (this.password == '') || (typeof this.password == 'undefined') || (typeof this.password == null);

    if (isUsernameEmpty) {
      this.toastr.error("Username cannot be empty!");
      return false;
    }

    if (isPasswordEmpty) {
      this.toastr.error("Password cannot be empty!");
      return false;
    }

    return true;
  }
}
