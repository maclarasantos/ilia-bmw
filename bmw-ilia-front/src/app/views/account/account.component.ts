import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuoteService } from './../quote/quote.service';
import { Quote } from '../../model/quote.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    private cookieService: CookieService
  ) {}

  email: string = '';
  showQuotes: boolean = false;
  quotes: Quote[] = [];
  showError: boolean = false;

  ngOnInit(): void {
    if (this.cookieService.check('userEmail')) {
      this.getQuote(this.cookieService.get('userEmail'));
    }
  }

  getQuote(mail: string) {
    if (mail == '') {
      alert('Informe um email para continuar');
      return;
    }
    if (this.email && this.cookieService.get('userEmail')) {
      this.cookieService.set('userEmail', this.email, 1, '/');
    }
    this.quoteService.getQuotesByMail(mail).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.quotes = data;
          this.showQuotes = data.length > 0;
          this.showError = data.length == 0;
        } else {
          this.quotes = [];
        }
      },
      error: (err) => {
        this.showQuotes = false;
        this.showError = true;
      },
    });
    if (this.quotes.length == 0) {
      this.showQuotes = false;
      this.showError = true;
    }
  }

  cancelQuote(id: Number) {
    this.quoteService.deleteQuote(id.toString()).subscribe({
      next: (response) => {
        this.reloadComponent();
      },
      error: (err) => {
        console.error('Error deleting resource', err);
      },
    });
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
