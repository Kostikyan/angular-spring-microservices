import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username: string = '...';

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.username = this.auth.getCurrentUserEmail()!;
  }
}
