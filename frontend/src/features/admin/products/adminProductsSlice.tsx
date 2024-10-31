import { Product } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { createAdminProduct, fetchAdminProducts } from '@/features/admin/products/adminProductsThunks';

export interface AdminProductsState {
  items: Product[];
  product: Product | null;
  itemsFetching: boolean;
  isCreating: boolean;
}

const initialState: AdminProductsState = {
  items: [],
  product: null,
  itemsFetching: false,
  isCreating: false,
};

export const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, { payload: products }) => {
        state.itemsFetching = false;
        state.items = products;
      })
      .addCase(fetchAdminProducts.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createAdminProduct.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createAdminProduct.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createAdminProduct.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectAdminProducts: (state) => state.items,
    selectAdminProductsFetching: (state) => state.itemsFetching,
    selectAdminProductCreating: (state) => state.isCreating,
  },
});

export const adminProductsReducer = adminProductsSlice.reducer;

export const { selectAdminProducts, selectAdminProductsFetching, selectAdminProductCreating } =
  adminProductsSlice.selectors;
