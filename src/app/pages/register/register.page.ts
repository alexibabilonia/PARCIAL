import { Component, OnInit, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingController } from '@ionic/angular'; // 👈 Importar loading

interface Country {
  id: string;
  value: string;
  emoji?: string;
}

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  country: Country | null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  user: User = this.getEmptyUser();
  countries: Country[] = [];

  // 👁️ Variables para mostrar/ocultar contraseñas
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private countryService: CountryService,
    private notificationService: NotificationService,
    private router: Router,
    private loadingCtrl: LoadingController // 👈 Inyectar loading
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  ionViewWillEnter() {
    this.resetForm(); // limpia cada vez que entras al registro
  }

  private getEmptyUser(): User {
    return {
      id: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: null,
    };
  }

  private resetForm() {
    this.user = this.getEmptyUser();

    if (this.registerForm) {
      this.registerForm.resetForm();
    }
  }

  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: (data: Country[]) => {
        this.countries = data.sort((a, b) => a.value.localeCompare(b.value));
      },
      error: () => {
        this.notificationService.error('❌ No se pudieron cargar los países.');
      },
    });
  }

  // 👁️ Método para alternar visibilidad de contraseñas
  togglePassword(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // 👉 Método auxiliar para mostrar spinner
  private async presentLoading(message: string = 'Procesando...') {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      duration: 1500 // se cierra solo en 1.5s
    });
    await loading.present();
    return loading;
  }

  async onRegister() {
    if (
      !this.user.name ||
      !this.user.lastName ||
      !this.user.email ||
      !this.user.password ||
      !this.user.confirmPassword ||
      !this.user.country
    ) {
      this.notificationService.warning('⚠️ Por favor, completa todos los campos.');
      return;
    }

    // 📌 Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.notificationService.error('⚠️ Ingresa un correo válido.');
      return;
    }

    // 📌 Validar que las contraseñas coincidan
    if (this.user.password !== this.user.confirmPassword) {
      this.notificationService.error('⚠️ Las contraseñas no coinciden.');
      return;
    }

    // 📌 Verificar si ya existe un usuario con ese correo
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.some((u: any) => u.email === this.user.email);

    if (exists) {
      this.notificationService.error('❌ El correo ya está registrado.');
      return;
    }

    //  Si todo está bien, registrar
    this.user.id = uuidv4();
    users.push(this.user);
    localStorage.setItem('users', JSON.stringify(users));

    this.notificationService.success(
      `✅ Usuario ${this.user.name} registrado con éxito`
    );

    // 👉 Mostrar spinner de carga
    const loading = await this.presentLoading('Registrando...');

    // limpiar datos y formulario
    this.resetForm();

    // Redirigir a login cuando termine el loading
    loading.onDidDismiss().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
