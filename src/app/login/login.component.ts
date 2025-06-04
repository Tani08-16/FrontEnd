import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],  // ✅ Ensure RouterModule and FormsModule are included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('http://localhost:7095/api/Auth/login', this.loginData)
      .subscribe({
        next: (res: any) => {
          const token = res.token;
          if (!token) {
            alert("Login failed: No token received!");
            return;
          }

          localStorage.setItem('token', token);
          console.log('JWT Token Stored:', token);

          try {
            const decodedToken: any = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);

            const userRole = decodedToken?.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (!userRole) {
              alert("Login failed: Role missing!");
              return;
            }

            localStorage.setItem('userRole', userRole);

            const dashboardRoutes: Record<string, string> = {
              'Admin': '/admin-dashboard',
              'Teacher': '/teacher-dashboard',
              'Student': '/student-dashboard'
            };

            this.router.navigate([dashboardRoutes[userRole]]);
          } catch (error) {
            console.error("Error decoding JWT:", error);
            alert("Login failed: Invalid token!");
          }
        },
        error: err => {
          console.error('Login failed:', err);
          alert(err.error.message || 'Login failed!');
        }
      });
  }
}
