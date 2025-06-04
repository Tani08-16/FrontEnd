import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log('Token:', token);  // Debug statement
    return !!token;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
