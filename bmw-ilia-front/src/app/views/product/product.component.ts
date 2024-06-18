import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  requestQuote(event: Event, product: Product | undefined) {
    event.preventDefault();
    this.router.navigate(['/quote', product?.id]);
  }
}
