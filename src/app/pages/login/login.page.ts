import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor() {}

  onLogin() {
    console.log('Ingresar con:', this.email, this.password);
    
  }

  onRegister() {
    console.log('Ir a registro');
    
  }
}
