import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:8080/Products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    var url = this.apiUrl + '?page=0&pageSize=100';
    return this.http.get<any>(url);
  }

  getProductById(id: string): Observable<any> {
    var url = this.apiUrl + '/' + id;
    return this.http.get<any>(url);
  }
}
