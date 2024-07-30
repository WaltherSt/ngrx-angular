import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product';
import { findAll, load } from './products.actions';

export interface StateInit {
  products: Product[];
}

const initialState: StateInit = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(load, (state) => ({ products: [...state.products] })),
  on(findAll, (state, { products }) => ({ products: [...products] }))
);
