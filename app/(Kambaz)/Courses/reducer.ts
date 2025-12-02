import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [] as any[],
  myCourses: [] as any[],
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }) => {
      state.courses = [...state.courses, course];
      if (!state.myCourses.some((c) => c._id === course._id)) {
        state.myCourses.push(course);
      }
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
      state.myCourses = state.myCourses.filter((c) => c._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
      state.myCourses = state.myCourses.map((c) =>
        c._id === course._id ? course : c
      );
    },
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },

    setMyCourses: (state, { payload: myCourses }) => {
      state.myCourses = myCourses;
    },

    addMyCourse: (state, { payload: course }) => {
      if (!state.myCourses.some((c) => c._id === course._id)) {
        state.myCourses.push(course);
      }
    },

    removeMyCourse: (state, { payload: courseId }) => {
      state.myCourses = state.myCourses.filter((c) => c._id !== courseId);
    },
  },
});
export const {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
  setMyCourses,
  addMyCourse,
  removeMyCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;
