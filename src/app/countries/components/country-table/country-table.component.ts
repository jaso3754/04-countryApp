import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
      `img {
        width: 35px;
      }`,
      ` th {
        padding: 10px;
      }`
  ]
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];
country: any;

}
