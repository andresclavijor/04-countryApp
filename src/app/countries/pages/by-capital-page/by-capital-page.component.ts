import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/Countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  constructor(private readonly countriesService: CountriesService) {}
  public countries: Country[] = [];
  public isloading: boolean = false;
  public initialValue?: string;

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string) {
    this.isloading = true;
    this.countriesService.searchByCapital(term).subscribe({
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
