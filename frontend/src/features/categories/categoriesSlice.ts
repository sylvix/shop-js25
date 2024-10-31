import { Category } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '@/features/categories/categoriesThunks';

interface CategoriesState {
  items: Category[];
  itemsFetching: boolean;
}

const initialState: CategoriesState = {
  items: [],
  itemsFetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.itemsFetching = false;
        state.items = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.itemsFetching = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.items,
    selectCategoriesFetching: (state) => state.itemsFetching,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { selectCategories, selectCategoriesFetching } = categoriesSlice.selectors;
