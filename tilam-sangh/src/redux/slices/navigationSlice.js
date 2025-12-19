import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {

}

export const fetchNavigationData = createAsyncThunk(
    'navigation/fetchNavigationData',
    async () => {
        // Fetch navigation data logic here
    }
)

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    extraReducers: (builder) => {
        // Add your reducers here
    }
})

export default navigationSlice.reducer;