import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'


import { AppComponent } from './app.component'
import { CollectionViewModule } from "@nativescript-community/ui-collectionview/angular";
import { TNSImageModule } from '@nativescript-community/ui-image/angular';
@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, CollectionViewModule, TNSImageModule],
  declarations: [AppComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
