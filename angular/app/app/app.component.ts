import { Component } from '@angular/core'
import { ObservableArray } from '@nativescript/core';

const itemsData = require('@shared/assets/data.json');

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  items: ObservableArray<any>;
  constructor(){
    
    this.items = new ObservableArray(itemsData.products);;
    console.log("itesm:", this.items);
  }
}
