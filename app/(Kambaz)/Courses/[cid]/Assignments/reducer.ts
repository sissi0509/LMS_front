import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    // addAssignment: (state, { payload: assignment }) => {
    //   const newAssignment: any = {
    //     _id: uuidv4(),
    //     title: assignment.title,
    //     description: assignment.description,
    //     course: assignment.course,
    //     points: assignment.points,
    //     dueDate: assignment.dueDate,
    //     availableDate: assignment.availableDate,
    //     untilDate: assignment.untilDate,
    //   };
    //   state.assignments.push(newAssignment);
    // },

    // updateAssignment: (state, { payload: assignment }) => {
    //   state.assignments = state.assignments.map((a) =>
    //     a._id === assignment._id ? assignment : a
    //   );
    // },
    // editAssignment: (state, { payload: assignmentId }) => {
    //   state.assignments = state.assignments.map((m) =>
    //     m._id === assignmentId ? { ...m, editing: true } : m
    //   );
    // },
  },
});
export const {
  setAssignments,
  deleteAssignment,
  // addAssignment,
  // updateAssignment,
  // editAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
