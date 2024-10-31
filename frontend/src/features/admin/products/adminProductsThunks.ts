import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductMutation } from '@/types';
import axiosApi from '@/axiosApi';

export const fetchAdminProducts = createAsyncThunk<Product[], string | undefined>(
  'adminProducts/fetchAll',
  async (categoryId) => {
    const { data: products } = await axiosApi.get<Product[]>(`/products`, { params: { category: categoryId } });
    return products;
  },
);

export const createAdminProduct = createAsyncThunk<void, ProductMutation>(
  'adminProducts/create',
  async (productMutation) => {
    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
    keys.forEach((key) => {
      const value = productMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/products', formData);
  },
);
