import { Product } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOneProduct, fetchProducts } from './productsThunks';

export interface ProductsState {
  items: Product[];
  product: Product | null;
  itemsFetching: boolean;
  oneFetching: boolean;
}

const initialState: ProductsState = {
  items: [],
  product: null,
  itemsFetching: false,
  oneFetching: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
        state.itemsFetching = false;
        state.items = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(fetchOneProduct.pending, (state) => {
        state.product = null;
        state.oneFetching = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, { payload: product }) => {
        state.product = product;
        state.oneFetching = false;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.oneFetching = false;
      });
  },
  selectors: {
    selectProducts: (state) => state.items,
    selectProductsFetching: (state) => state.itemsFetching,
    selectOneProduct: (state) => state.product,
    selectOneProductFetching: (state) => state.oneFetching,
  },
});

export const productsReducer = productsSlice.reducer;

export const { selectProducts, selectProductsFetching, selectOneProduct, selectOneProductFetching } =
  productsSlice.selectors;
