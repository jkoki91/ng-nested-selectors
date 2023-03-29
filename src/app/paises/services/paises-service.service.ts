import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {

  private baseUrl: string = 'https://restcountries.com/v3.1';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones() {
    return [ ...this._regiones ];
  }

  constructor( private http: HttpClient ) { }

  getPaisesPorRegion( region: string ): Observable<PaisSmall[]> {
    const url: string = `${this.baseUrl}/region/${ region }?fields=cca3,name`

    return this.http.get<PaisSmall[]>(url);

  }

  getPaisePorCode( pais: string ): Observable<Pais[] | null> {
    if(!pais) {
      return of(null)
    }

    const url: string = `${this.baseUrl}/alpha?codes=${ pais }`

    return this.http.get<Pais[]>(url);

  }
}
