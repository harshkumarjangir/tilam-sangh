import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialState = {
  // store per-slug data under dataBySlug
  dataBySlug: {},
  seoBySlug: {},
  loading: false,
  error: null,
};

// fetch a single page by slug
export const fetchPageBySlug = createAsyncThunk(
  "pages/fetchPageBySlug",
  async (slug = "", { rejectWithValue }) => {
    try {
      // Normalize payload: older calls might pass an object like { slug: "profile" }
      let realSlug = "";
      if (typeof slug === "string") {
        realSlug = slug;
      } else if (slug && typeof slug === "object") {
        // if user passed { slug: "x" } or similar, prefer that
        if (typeof slug.slug === "string") realSlug = slug.slug;
        else {
          // attempt to stringify safely, but warn — this usually indicates an incorrect dispatch
          console.warn("fetchPageBySlug received unexpected payload:", slug);
          try {
            realSlug = String(slug);
          } catch (err) {
            realSlug = "";
          }
        }
      }

      const path = realSlug ? `/${realSlug}` : ""; // backend expects /api/pages/ or /api/pages/slug
      const response = await axios.get(`${BACKEND_URL}/pages${path}`);
      // backend returns { success, slug, data, seo }
      console.log("Page API response:", response.data);
      return { slug: realSlug, payload: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch page data");
    }
  }
);

// optionally fetch all pages if needed
export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/pages`);
      return response.data; // shape depends on backend
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch pages");
    }
  }
);

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPageBySlug.fulfilled, (state, action) => {
        state.loading = false;
        const slug = action.payload?.slug ?? "";
        // console.log("slug redux", slug )
        // backend now returns { success: true, data: { slug, data, seo, ... } }
        // so payload.data is the PAGE object
        const pageObj = action.payload?.payload?.data;

        const data = pageObj?.data ?? null;
        // console.log("data redux", data )
        const seo = pageObj?.seo ?? null;
        // console.log("seo redux", seo )
        if (data) state.dataBySlug[slug] = data;
        if (seo) state.seoBySlug[slug] = seo;
      })
      .addCase(fetchPageBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        // if backend returns an array or map, keep it raw under dataBySlug.__all__
        state.dataBySlug.__all__ = action.payload?.data ?? action.payload ?? null;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pagesSlice.reducer;

// selectors
export const selectPageData = (state, slug = "") => state.pages.dataBySlug?.[slug] || null;
export const selectPageLoading = (state) => state.pages.loading;
export const selectPageError = (state) => state.pages.error;
