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
      return true; // ✅ Sí hay sesión → deja pasar
    } else {
      this.router.navigate(['/login']); // 🔒 No hay sesión → manda a login
      return false;
    }
  }
}
