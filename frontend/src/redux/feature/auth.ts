import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';
import {
  AuthSliceType,
  FormRegistrationValues,
  PostType,
} from '../../@types/appTypes';

export const fetchUserRegister = createAsyncThunk(
  'auth/fetchUserRegister',
  async (params: FormRegistrationValues) => {
    try {
      const user = await axios.post('/api/registration', params);
      const { token: jwt, ...data } = user.data;

      localStorage.setItem('token', jwt);

      return data._doc;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (
    params: Pick<FormRegistrationValues, 'email' | 'password'> & {
      token: string | null;
    }
  ) => {
    try {
      const { token, ...userInfo } = params;
      const user = await axios.post('/api/login', userInfo);
      const { token: jwt, ...data } = user.data;

      localStorage.setItem('token', jwt);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  try {
    const user = await axios.get('api/me');

    return user.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState: AuthSliceType = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRegister.pending, (state, { payload }) => {
      state.data = null;
    });
    builder.addCase(fetchUserRegister.rejected, (state, { payload }) => {
      state.data = null;
    });
    builder.addCase(fetchUserRegister.fulfilled, (state, { payload }) => {
      state.data = payload as PostType['author'];
      state.status = 'fulfilled';
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.data = payload as PostType['author'];
      state.status = 'fulfilled';
    });
    builder.addCase(fetchMe.pending, (state) => {
      state.data = null;
      state.status = 'loading';
    });
    builder.addCase(fetchMe.rejected, (state) => {
      state.data = null;
      state.status = 'error';
    });
    builder.addCase(fetchMe.fulfilled, (state, { payload }) => {
      state.data = payload as PostType['author'];
      state.status = 'fulfilled';
    });
  },
});

export const selectIsAuth = (data: AuthSliceType['data']) => Boolean(data);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
