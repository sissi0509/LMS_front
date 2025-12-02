// // app/Enrollments/reducer.ts
"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollmentsReducer",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enroll: (state, { payload }) => {
      state.enrollments.push(payload);
    },
    unenroll: (state, { payload }) => {
      const { user, course } = payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
