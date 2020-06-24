import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryDTO } from 'src/app/DTOs/countryDTO';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countriesList: CountryDTO[];
  constructor(private http: HttpClient) {}

  getCountries() {
    var json = require('./countries.json');

    this.countriesList = json;
    // this.countriesList.map((e) => {
    //   console.log(e.name);
    // });
    return this.countriesList;
  }
}
