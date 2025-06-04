import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminDashboardComponent implements OnInit {
  teachers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.http.get('http://localhost:7095/api/teachers')
      .subscribe((data: any) => {
        this.teachers = data;
      });
  }

  // ✅ Fix: Add `addTeacher()` method here
  addTeacher() {
    const teacherData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'defaultpassword'
    };

    this.http.post('http://localhost:7095/api/Auth/add-teacher', teacherData)
      .subscribe({
        next: res => {
          alert('Teacher added successfully!');
          this.loadTeachers(); // Reload teacher list after adding
        },
        error: err => {
          alert(err.error.message || 'Failed to add teacher.');
        }
      });
  }
}
