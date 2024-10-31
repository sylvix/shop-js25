import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { Category } from '@/types';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const { data: categories } = await axiosApi.get<Category[]>('/categories');
  return categories;
});
