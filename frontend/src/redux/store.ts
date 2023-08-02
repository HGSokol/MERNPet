import { configureStore } from '@reduxjs/toolkit'

import posts from './feature/posts'
import auth from './feature/posts'

const store = configureStore({
  reducer:{
    posts,
    auth
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store