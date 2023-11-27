import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  currentUserId!: number;

  constructor(private auth: AuthService, private router: Router) {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  showDropdown(dropdown: any) {
    if(dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    } else {
      dropdown.classList.add('hidden');
    }
  }

  ngOnInit() {
    this.currentUserId = this.auth.getCurrentUser().id;
  }
}
