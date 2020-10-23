import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaymentTableComponent } from './components/payment-table/payment-table.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/controls/button/button.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [AppComponent, PaymentTableComponent, ButtonComponent],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
