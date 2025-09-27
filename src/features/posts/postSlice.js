import { createSlice } from "@reduxjs/toolkit";

const postInitialState = {
    entries: localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : []
};

const postSlice = createSlice({
    name: "posts",
    initialState: postInitialState,
    reducers: {
        create: (state, action) => {
            state.entries.push(action.payload);

            localStorage.setItem('entries', JSON.stringify(state.entries));
        },
        update: (state, action) => {
            const postToUpdate = state.entries.find(post => post.id == action.payload.id);
            if (postToUpdate) {
                postToUpdate.name = action.payload.name;
                postToUpdate.description = action.payload.description;
                postToUpdate.author = action.payload.author;
                localStorage.setItem('entries', JSON.stringify(state.entries));
            }
        },
        remove: (state, action) => {
            state.entries = state.entries.filter(post => post.id != action.payload);
            localStorage.setItem('entries', JSON.stringify(state.entries));
        }
    }

});

export const { create, update, remove } = postSlice.actions;

export default postSlice.reducer;