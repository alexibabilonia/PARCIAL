import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone:false
})
export class SettingsPage implements OnInit {

  settingsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    this.settingsForm = this.fb.group({
      name: [userData.name || '', Validators.required],
      email: [userData.email || '', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)], // opcional cambiar clave
    });
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      const newUserData = this.settingsForm.value;

      // Si no se cambia la contraseña, se conserva la anterior
      const oldData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (!newUserData.password) {
        newUserData.password = oldData.password;
      }

      // Guardar en localStorage (aquí puedes llamar a tu API si la tienes)
      localStorage.setItem('userData', JSON.stringify(newUserData));

      alert('✅ Datos actualizados correctamente');

      // Redirigir al home
      this.router.navigate(['/home']);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
