import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { Product } from '@/types';

export const fetchProducts = createAsyncThunk<Product[], string | undefined>(
  'products/fetchAll',
  async (categoryId) => {
    const { data: products } = await axiosApi.get<Product[]>(`/products`, { params: { category: categoryId } });
    return products;
  },
);

export const fetchOneProduct = createAsyncThunk<Product, string>('products/fetchOne', async (id) => {
  const { data: product } = await axiosApi.get<Product>(`/products/${id}`);
  return product;
});
