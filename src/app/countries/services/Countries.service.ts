import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { term: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.LoadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private LoadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      delay(500),
      catchError(() => of([]))
    );
  }

  searchByCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap(()=>{this.saveToLocalStorage()})
    );
  }

  searchByPais(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${term}`).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      tap(()=>{this.saveToLocalStorage()})
    );
  }

  searchByRegion(term: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${term}`).pipe(
      tap((countries) => (this.cacheStore.byRegion = { term, countries })),
      tap(()=>{this.saveToLocalStorage()})
    );
  }

  searchByAlphaCode(term: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${term}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
