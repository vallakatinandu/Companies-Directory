import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompaniesApi, fetchCompanyFiltersApi } from "../api/companies";

// =============== FETCH COMPANIES ===============
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().companies;

      const params = {
        page: state.page,
        limit: state.pageSize,
        search: state.filters.search,
        industry: state.filters.industry,
        location: state.filters.location,
        sortBy: state.sortBy,
        sortDir: state.sortDir,
      };

      const data = await fetchCompaniesApi(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =============== FETCH FILTERS ===============
export const fetchCompanyFilters = createAsyncThunk(
  "companies/fetchCompanyFilters",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCompanyFiltersApi();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const companiesSlice = createSlice({
  name: "companies",

  initialState: {
    items: [],
    loading: false,
    error: null,

    // filters
    filters: { search: "", industry: "", location: "" },

    // sorting
    sortBy: "name",
    sortDir: "asc",

    // pagination
    page: 1,
    pageSize: 5,
    totalPages: 1,
    totalRecords: 0,

    // full filters from backend
    filtersList: {
      industries: [],
      locations: [],
    },
  },

  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.page = 1;
    },

    resetFilters: (state) => {
      state.filters = { search: "", industry: "", location: "" };
      state.sortBy = "name";
      state.sortDir = "asc";
      state.page = 1;
    },

    setSort: (state, action) => {
      const { sortBy } = action.payload;

      if (state.sortBy === sortBy) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = sortBy;
        state.sortDir = "asc";
      }

      state.page = 1;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        // KEEP existing items to avoid flicker
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;

        // API returns { success, data, meta }
        state.items = action.payload?.data ?? [];
        state.page = action.payload?.meta?.page ?? state.page;
        state.pageSize = action.payload?.meta?.limit ?? state.pageSize;
        state.totalPages = action.payload?.meta?.totalPages ?? state.totalPages;
        state.totalRecords =
          action.payload?.meta?.totalRecords ?? state.totalRecords;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      // Fetch Filters
      .addCase(fetchCompanyFilters.fulfilled, (state, action) => {
        // <-- IMPORTANT: use action.payload (not action)
        state.filtersList.industries = action.payload?.industries ?? [];
        state.filtersList.locations = action.payload?.locations ?? [];
      })
      .addCase(fetchCompanyFilters.rejected, (state, action) => {
        // keep safe defaults on error
        state.filtersList.industries = [];
        state.filtersList.locations = [];
      });
  },
});

export const { setFilter, resetFilters, setSort, setPage, setPageSize } =
  companiesSlice.actions;

export default companiesSlice.reducer;
