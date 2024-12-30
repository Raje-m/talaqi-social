import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'; 
import { postsSlice } from './postsSlice';


export const store = configureStore( {
  reducer: {
    
    [ apiSlice.reducerPath ]: apiSlice.reducer,
    postsSlice:postsSlice.reducer
  },
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware().concat( apiSlice.middleware ),
} );