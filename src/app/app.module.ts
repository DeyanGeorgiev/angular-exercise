import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';

import {
  AppComponent
} from './app.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  M2bRestAutocompleteComponent
} from './m2b-rest-autocomplete/m2b-rest-autocomplete.component';
import {
  ReactiveFormsModule,
} from "@angular/forms";

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AngularMaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    M2bRestAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
