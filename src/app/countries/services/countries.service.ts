import { Region } from './../interfaces/region.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,  delay,  map,  Observable, of, tap,  } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-Store.interface';


@Injectable( { providedIn: 'root' } )



export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: { term:'', countries: [] },
    byCountries: { term:'', countries: [] },
    byRegion:  { region: '', countries: [] },

  }


  constructor(private http: HttpClient) { }

  private getCountriesRequest( url: string):Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( error => of ([]) ),
      // delay(2000),
      );
  }

  searchCountryByAlphacode (code:string ): Observable<Country | null> {

    const url = `${ this.apiURL }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
    .pipe(
      map (countries => countries.length > 0 ? countries [0]: null),
      catchError ( () => of ( null ) )
      );
  }

  searchCapital (term: string): Observable<Country[]>  {

    const url = `${ this.apiURL }/capital/${ term }`

    return this.getCountriesRequest(  url )
    .pipe (
      tap ( countries => this.cacheStore.byCapital = { term, countries })
    );
  }

  searchCountry (term :string): Observable<Country[]> {

      const url = `${ this.apiURL }/name/${ term }`
      return this.getCountriesRequest(  url );
  }

  searchRegion (term :string): Observable<Country[]> {

    const url = `${ this.apiURL }/region/${ term }`
    return this.getCountriesRequest(  url );
  }


}
