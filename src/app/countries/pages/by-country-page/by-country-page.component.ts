import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/Countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  constructor(private readonly countriesService: CountriesService) {}
  public countries: Country[] = [];
  public isloading = false;
  public initialValue?: string;

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByPais(term: string) {
    this.isloading = true;
    this.countriesService.searchByPais(term).subscribe({
      next: (countries) => {
        this.countries = countries;
        this.isloading = false;
      },
      error: (error) => {
        this.isloading = false;
      },
    });
  }
}
