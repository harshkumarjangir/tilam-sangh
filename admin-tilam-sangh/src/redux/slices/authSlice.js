import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

// Async thunks
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await authService.login(email, password);
            // Backend returns: { _id, name, email, role, token }
            if (data) {
                // User data is already saved to localStorage in authService.login if needed,
                // or we can remove that redundancy. authService.login returned data.
                // Actually authService.login line 4-6 in previous step added localStorage.setItem("user"...).
                // But let's keep consistency.
                return data;
            }
            return rejectWithValue("Login failed");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    authService.logout();
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const user = await authService.getCurrentUser(); // Updated to fetch from API
        return user;
    } catch (error) {
        return rejectWithValue("Not authenticated");
    }
});

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true, // Start loading to check auth
    error: null,
};

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = {
                    _id: action.payload._id,
                    name: action.payload.name,
                    email: action.payload.email,
                    role: action.payload.role,
                    permissions: action.payload.permissions
                };
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Payload is user object from /me
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
