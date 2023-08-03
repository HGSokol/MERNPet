import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './feature/posts'
import authReducer from './feature/auth'

const store = configureStore({
  reducer:{
    posts: postsReducer,
    auth: authReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store