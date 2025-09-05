import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Country {
  id: string;
  value: string; // bandera + nombre
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/unicode';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) =>
        response.data
          .map((c: any) => ({
            id: c.name,
            value: `${c.unicodeFlag} ${c.name}`,
          }))
          .sort((a: Country, b: Country) => a.value.localeCompare(b.value))
      )
    );
  }
}
