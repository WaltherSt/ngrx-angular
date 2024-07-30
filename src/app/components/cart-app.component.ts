import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { CartItem } from '../models/cartItem';
import { SharingDataService } from '../services/sharing-data.service';
import { add, remove, total } from '../store/items.actions';
import { ItemsState } from '../store/items.reducer';
import { CatalogComponent } from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private store: Store<{ items: ItemsState }>,
    private router: Router,
    private sharingDataService: SharingDataService
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      this.saveSession();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
      this.store.dispatch(add({ product: product }));
      this.store.dispatch(total());

      this.router.navigate(['/cart']);

      Swal.fire({
        title: 'Shopping Cart',
        text: 'Nuevo producto agregado al carro!',
        icon: 'success',
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      console.log(id + ' se ha ejecutado el evento idProductEventEmitter');

      Swal.fire({
        title: 'Esta seguro que desea eliminar?',
        text: 'Cuidado el item se eliminara del carro de compras!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({ id: id }));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);

          Swal.fire({
            title: 'Eliminado!',
            text: 'Se ha eliminado el item del carrito de compras.',
            icon: 'success',
          });
        }
      });
    });
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}