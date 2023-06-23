import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/Countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  constructor(private readonly countriesService: CountriesService) { }
  public countries: Country[] = [];

  searchByPais(term: string) {
    this.countriesService.searchByPais(term).subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (error) => {

       }
    })
  }
}
