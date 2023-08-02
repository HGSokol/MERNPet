import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthSliceType {
  value: number
}

const initialState: AuthSliceType = {
  value: 0,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{}
})

// export {} = authSlice.actions

export default authSlice.reducer