import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from './../../services/Countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  constructor(private readonly countriesService: CountriesService) {}
  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public isloading = false;
  public selectedRegion?: Region;

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.term;
  }

  searchByRegion(term: Region) {
    this.isloading = true;
    this.selectedRegion = term;
    this.countriesService.searchByRegion(term).subscribe({
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
