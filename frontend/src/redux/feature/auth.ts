import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FormLoginValues, FormRegistrationValues, PostType } from '../../@types/appTypes'

export interface AuthSliceType {
  user: {
    data: PostType['author'] | null,
    status: 'loading'| 'error' | 'fulfilled'
  },
  token: string,
}

export const fetchUserToken = createAsyncThunk('auth/fetchUserToken', async (params: FormRegistrationValues) => {
  try {
    const token = await axios.post('/api/registration', params)

    localStorage.setItem('token', token.data.token)

    return token.data.token as unknown as AuthSliceType['token']
  } catch (error) {
    console.log(error)
  }
})

export const fetchUser = createAsyncThunk('auth/fetchUser', async (params: FormLoginValues & {token:string} ) => {
  try {
    const {token, ...userInfo} = params
    const user = await axios.post('/api/login', userInfo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const {token:jwt, ...data} = user.data

    localStorage.setItem('token', jwt)

    return {jwt, data}
  } catch (error) {
    console.log(error)
  }
})



const initialState: AuthSliceType = {
  user: {
    data: {},
    status: 'loading'
  },
  token: localStorage.getItem('token') as string,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
      logout: (state) => {
        state.token = '';
        state.user.data = null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserToken.fulfilled, (state, { payload } ) => {
      state.token = payload as string ;
    }),
    builder.addCase(fetchUser.pending, (state) => {
      state.user.data = null;
      state.user.status = 'loading';
    }),
    builder.addCase(fetchUser.rejected, (state) => {
      state.user.data = null;
      state.user.status = 'error';
    }),
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user.data = payload?.data as PostType['author'];
      state.token = payload?.jwt as string;
      state.user.status = 'fulfilled';
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer