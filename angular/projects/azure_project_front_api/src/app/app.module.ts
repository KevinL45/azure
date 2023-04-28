import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ApplicationRef, EnvironmentProviders, Provider, importProvidersFrom} from "@angular/core";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [importProvidersFrom(BrowserAnimationsModule)],
  bootstrap: [AppComponent]
})
export class AppModule { }
