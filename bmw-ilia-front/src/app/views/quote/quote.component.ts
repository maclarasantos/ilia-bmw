import { Component } from '@angular/core';
import { Product } from '../../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuoteService } from './quote.service';
import { Person } from '../../model/person.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent {
  product: Product | undefined;
  person: Person | undefined;
  email: string = '';
  name: string = '';
  phone: string = '';
  showAdditionalFields: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private quoteService: QuoteService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService
        .getProductById(productId)
        .subscribe((data: Product) => {
          this.product = data;
        });
    }
    if (this.cookieService.check('userEmail')) {
      this.email = this.cookieService.get('userEmail');
    }
  }

  confirmarEmail(event: Event, product: Product | undefined, email: String) {
    event.preventDefault();
    this.router.navigate(['/products']);
  }

  verifyEmail(mail: string) {
    if (mail == '') {
      alert('Informe um email para continuar');
      return;
    }
    this.quoteService.getPersonByMail(mail).subscribe((data: Person) => {
      this.person = data;
      if (this.person != null) {
        this.name = this.person.name;
        this.phone = this.person.cellphone;
      }
      this.showAdditionalFields = true;
    });
    if (mail && this.cookieService.get('userEmail')) {
      this.cookieService.set('userEmail', mail, 1, '/');
    }
  }

  sendQuote() {
    if (this.email == '' || this.name == '' || this.phone == '') {
      alert('Informe todos os dados para continuar');
      return;
    }
    const quoteData = {
      person: {
        mail: this.email,
        name: this.name,
        cellphone: this.phone,
      },
      product: this.product,
    };
    this.quoteService.sendQuote(quoteData).subscribe(
      (response) => {
        this.router.navigate(['/account']);
      },
      (error) => {
        console.error('Erro ao atualizar pessoa:', error);
      }
    );
  }
}
