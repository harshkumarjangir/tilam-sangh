import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tenderServiceFrontend } from "../../services/tenderService";

// Async thunk to fetch all tenders
export const fetchTenders = createAsyncThunk(
    "tenders/fetchAll",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await tenderServiceFrontend.getAll(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    tenders: [],
    pagination: null,
    loading: false,
    error: null,
};

const tenderSlice = createSlice({
    name: "tenders",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTenders.fulfilled, (state, action) => {
                state.loading = false;
                state.tenders = action.payload.data || [];
                state.pagination = action.payload.pagination || null;
            })
            .addCase(fetchTenders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = tenderSlice.actions;
export default tenderSlice.reducer;
