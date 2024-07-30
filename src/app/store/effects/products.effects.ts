import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { findAll, load } from '../products.actions';

@Injectable()
export class ProductsEffects {
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        this.service.findAll().pipe(map((products) => findAll({ products })))
      )
    )
  );

  constructor(private actions$: Actions, private service: ProductService) {}
}
