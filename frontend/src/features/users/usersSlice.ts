import { GlobalError, User, ValidationError } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, login, register } from '@/features/users/usersThunks';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, { payload: user }) => {
        state.registerLoading = false;
        state.user = user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(googleLogin.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(googleLogin.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  },
});

export const usersReducer = usersSlice.reducer;

export const { unsetUser } = usersSlice.actions;

export const { selectUser, selectRegisterLoading, selectRegisterError, selectLoginLoading, selectLoginError } =
  usersSlice.selectors;
