import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/Countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  constructor(private readonly CountriesService: CountriesService) { }
  public countries: Country[] = [];

  searchByRegion(term: string) {
    this.CountriesService.searchByPais(term).subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (error) => {

       }
    })
  }
}
