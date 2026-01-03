import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchNavigationData = createAsyncThunk(
    "navigation/fetchNavigationData",
    // pass `language` string when dispatching, e.g. dispatch(fetchNavigationData(language))
    async (language = "English", { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/layout`, {
                params: { lang: language }
            });
            console.log("API response:", response.data);
            // backend returns { success, language, data: { navbar, footer } }
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch navigation data"
            );
        }
    }
);

const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {}, // optional normal reducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchNavigationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNavigationData.fulfilled, (state, action) => {
                state.loading = false;
                // keep only the `data` object from the backend response
                // backend response: { success, language, data: { navbar, footer } }
                state.data = action.payload?.data || null;
                state.language = action.payload?.language || state.language;
            })
            .addCase(fetchNavigationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default navigationSlice.reducer;
