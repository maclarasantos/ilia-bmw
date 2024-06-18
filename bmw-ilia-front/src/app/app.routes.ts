import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './commons/header/header.component';
import { ProductsComponent } from './views/products/products.component';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { BrowserModule } from '@angular/platform-browser';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { ProductComponent } from './views/product/product.component';
import { AccountComponent } from './views/account/account.component';
import { ProductsService } from './views/products/products.service';
import { QuoteComponent } from './views/quote/quote.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { QuoteService } from './views/quote/quote.service';
import { FooterComponent } from './commons/footer/footer.component';
import { CookieService } from 'ngx-cookie-service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'product/:id',
        component: ProductComponent,
      },
      {
        path: 'quote/:id',
        component: QuoteComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    AccountComponent,
    BrowserModule,
    QuoteComponent,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    HomeComponent,
    LandingPageComponent,
    ProductComponent,
    FormsModule,
    ProductsComponent,
  ],
  exports: [],
  providers: [ProductsService, QuoteService, HttpClientModule, CookieService],
  bootstrap: [],
})
export class AppModule {}
