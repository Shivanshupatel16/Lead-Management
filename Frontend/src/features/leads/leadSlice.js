import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/axios";


const API_URL = "/api/leads"; 


export const fetchLeads = createAsyncThunk(
  "leads/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(API_URL, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch leads");
    }
  }
);


export const createLead = createAsyncThunk(
  "leads/create",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data.lead;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to create lead");
    }
  }
);


export const updateLead = createAsyncThunk(
  "leads/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data.lead;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to update lead");
    }
  }
);


export const deleteLead = createAsyncThunk(
  "leads/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to delete lead");
    }
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState: { items: [], total: 0, page: 1, pages: 1, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchLeads.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload.items;
        s.total = a.payload.total;
        s.page = a.payload.page;
        s.pages = a.payload.pages;
      })
      .addCase(fetchLeads.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })
      .addCase(createLead.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
        s.total += 1;
      })
      .addCase(updateLead.fulfilled, (s, a) => {
        const idx = s.items.findIndex((x) => x._id === a.payload._id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(deleteLead.fulfilled, (s, a) => {
        s.items = s.items.filter((x) => x._id !== a.payload);
        s.total = Math.max(0, s.total - 1);
      });
  },
});

export default leadSlice.reducer;
