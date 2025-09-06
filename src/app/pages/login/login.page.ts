import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular'; // 👈 Importar

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
    private notificationService: NotificationService,
    private loadingCtrl: LoadingController // 👈 Inyectar
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

  // 👉 Método auxiliar para mostrar spinner
  private async presentLoading(message: string = 'Ingresando...') {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      duration: 1500 // ⏱️ se cierra en 1.5s
    });
    await loading.present();
    return loading;
  }

  async onLogin() {
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

      // 👉 Mostrar spinner de carga
      const loading = await this.presentLoading();

      // Redirigir a home cuando termine el loading
      loading.onDidDismiss().then(() => {
        this.router.navigate(['/home']);
      });
    } else {
      this.notificationService.error('❌ Credenciales incorrectas');
    }
  }
}
