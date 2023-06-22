import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/Countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  constructor(private readonly countriesService: CountriesService) { }
  public countries: Country[] = [];

  searchByCapital(term: string) {
    this.countriesService.searchByCapital(term).subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (error) => {

       }
    })
  }
}
