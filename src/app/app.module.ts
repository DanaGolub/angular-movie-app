import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ImageComponent } from './app.imageComponent';
import { AboutComponent } from './app.about';
import { routing }        from './app.routing';


@NgModule({
  declarations: [
    AppComponent, ImageComponent, AboutComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
