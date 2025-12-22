import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigationSlice.js';
import pagesReducer from './slices/pagesSlice.js';

const store = configureStore({
    reducer: {
        // Add your reducers here
        navigation: navigationReducer,
        pages: pagesReducer,
    }
})

export default store;