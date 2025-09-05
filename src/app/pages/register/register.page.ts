import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CountryService } from 'src/app/services/country.service';

interface Country {
  id: string;
  value: string;
}

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  country: Country | null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage implements OnInit {
  user: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    country: null,
  };

  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: (data: Country[]) => {
        this.countries = data.sort((a: Country, b: Country) =>
          a.value.localeCompare(b.value)
        );
      },
      error: (err: unknown) =>
        console.error('❌ Error cargando países', err),
    });
  }

  onRegister() {
    if (
      !this.user.name ||
      !this.user.lastName ||
      !this.user.email ||
      !this.user.password ||
      !this.user.country
    ) {
      alert('⚠️ Por favor, completa todos los campos.');
      return;
    }

    // Generar un ID único
    this.user.id = uuidv4();

    console.log('Usuario registrado:', this.user);
    alert(`✅ Usuario ${this.user.name} registrado con éxito`);
  }
}