import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product';
import { SharingDataService } from '../../services/sharing-data.service';
import { load } from '../../store/products.actions';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private store: Store<{ products: Product[] }>,
    private sharingDataService: SharingDataService
  ) {
    this.store.select('products').subscribe((state: any) => {
      this.products = state.products;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(load());
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
