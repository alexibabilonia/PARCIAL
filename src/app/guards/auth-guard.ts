import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      return true; // ✅ Está logueado → puede entrar
    } else {
      this.router.navigate(['/login']); // 🚫 No logueado → redirige a login
      return false;
    }
  }
}