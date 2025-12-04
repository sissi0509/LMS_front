import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [] as any[],
}

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
    },
});

export const { setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;