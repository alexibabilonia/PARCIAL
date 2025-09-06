import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false
})
export class AppComponent {
  selectedCategory = 'all'; 

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.router.navigate(['/home'], { queryParams: { category } });

    const menu = document.querySelector('ion-menu');
    if (menu) (menu as any).close();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    const menu = document.querySelector('ion-menu');
    if (menu) (menu as any).close();
  }
}
