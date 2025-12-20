import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigationSlice.js';

const store = configureStore({
    reducer: {
        // Add your reducers here
        navigation: navigationReducer,
    }
})

export default store;