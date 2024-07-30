import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { products } from '../data/product.data';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  findAll(): Observable<Product[]> {
    return of(products);
  }
}
