import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  @ViewChild('loginForm') loginForm!: NgForm;

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ionViewWillEnter() {
    this.resetForm(); // limpia cada vez que entras al login
  }

  private resetForm() {
    this.email = '';
    this.password = '';
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.notificationService.warning('⚠️ Ingresa correo y contraseña.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === this.email && u.password === this.password
    );

    if (user) {
      // ✅ Guardamos al usuario actual para que los guards lo usen
      localStorage.setItem('currentUser', JSON.stringify(user));

      this.notificationService.success(`👋 Bienvenido ${user.name}`);
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    } else {
      this.notificationService.error('❌ Credenciales incorrectas');
    }
  }
}