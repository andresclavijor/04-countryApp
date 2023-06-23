import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/Countries.service';
import { map, switchMap } from 'rxjs';
import { Country, Translation } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {
  public country?: Country;
  public traducciones: Translation[] = [];


  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly countriesService: CountriesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.countriesService.searchByAlphaCode(id)),
    ).subscribe((country) => {
      if (!country) {
        this.router.navigateByUrl('');
        return
      }
      this.country = country;
      this.CargarTraducciones();
    });
  }

  CargarTraducciones() {
    if (this.country) {
      for (const key in this.country.translations) {
        if (Object.prototype.hasOwnProperty.call(this.country.translations, key)) {
          const element = this.country.translations[key];
          this.traducciones?.push(element)
        }
      }
    }
  }
}
