import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando o CommonModule
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { ProductsService } from './products.service';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [CommonModule, HttpClientModule]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductsService, private router: Router) { }


  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.map((product: Product) => ({
        ...product,
        description: this.truncateText(product.description, 150)
      }));
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  }

  goToProduct(event: Event, product: Product | undefined) {
    event.preventDefault();
    this.router.navigate(['/product', product?.id]);
  }
}
