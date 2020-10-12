import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { TravelsViewComponent } from './travels-view/travels-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    TravelsViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
