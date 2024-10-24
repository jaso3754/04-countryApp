import { Component, Output} from '@angular/core';

import { EventEmitter } from 'stream';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  searchByCapital ( term: string ):void {
    console.log('Desde ByCapitalPage');
    console.log({  term });


  }

}
