import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mockChapters } from "../data/mockData";
import type { Chapter } from "../data/mockData";

interface ChaptersState {
  chapters: Chapter[];
  activeSubject: "Physics" | "Chemistry" | "Mathematics";
  filters: {
    classes: string[];
    units: string[];
    status: string[];
    weakChapters: boolean;
  };
  sortOrder: "asc" | "desc";
}

const initialState: ChaptersState = {
  chapters: mockChapters,
  activeSubject: "Physics",
  filters: {
    classes: [],
    units: [],
    status: [],
    weakChapters: false,
  },
  sortOrder: "asc",
};

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    setActiveSubject: (
      state,
      action: PayloadAction<"Physics" | "Chemistry" | "Mathematics">
    ) => {
      state.activeSubject = action.payload;
      state.filters = {
        classes: [],
        units: [],
        status: [],
        weakChapters: false,
      };
    },
    setClassesFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.classes = action.payload;
    },
    setUnitsFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.units = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.status = action.payload;
    },
    setWeakChaptersFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.weakChapters = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    clearFilters: (state) => {
      state.filters = {
        classes: [],
        units: [],
        status: [],
        weakChapters: false,
      };
    },
  },
});

export const {
  setActiveSubject,
  setClassesFilter,
  setUnitsFilter,
  setStatusFilter,
  setWeakChaptersFilter,
  toggleSortOrder,
  clearFilters,
} = chaptersSlice.actions;

export default chaptersSlice.reducer;
