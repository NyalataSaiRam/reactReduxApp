// 1. import createAsyncThunk
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://68d812bc2144ea3f6da74b7b.mockapi.io/api/posts";

const axiosInstance = axios.create({
    baseURL: "https://68d812bc2144ea3f6da74b7b.mockapi.io/api"

});

// 2. define Async thunk
export const createPostThunk = createAsyncThunk(
    "post/createPostThunk",
    async (postData, { rejectWithValue }) => {
        // 5. destructuring ThunkAPI for method rejectWithValue, with this method we can send custom error messages
        try {
            const response = await axiosInstance.post("/posts", postData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.data?.message || "Some error occured, Please try again");
        }

    }
);

export const getPostThunk = createAsyncThunk(
    "post/getPostThunk",
    async (_, { rejectWithValue }) => {
        // _ is just a placeholder, we used it because rejectWithValue comes in second argument, and for fetching data we dont pass any data as first argument.
        try {
            const response = await axiosInstance.get("/posts");
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.data?.message || "Some fetching data");
        }

    }
);

export const updatePostThunk = createAsyncThunk(
    "post/updatePostThunk",
    async (postArg, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/posts/${postArg.id}`, postArg);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.data?.message || "Error updating data");
        }

    }
);

export const deletePostThunk = createAsyncThunk(
    "post/deletePostThunk",
    async (postId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/posts/${postId}`);
            return postId;
        } catch (error) {
            return rejectWithValue(error?.data?.message || "Error deleting data");
        }

    }
);

const postInitialState = {
    // entries: localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : [],
    entries: [],
    // added two more entries to track async operation's status and error messages
    status: "idle",
    error: null

};

const postSlice = createSlice({
    name: "posts",
    initialState: postInitialState,
    reducers: {
        // create: (state, action) => {
        // 4. remove create now, no need of this
        //     state.entries.push(action.payload);

        //     localStorage.setItem('entries', JSON.stringify(state.entries));
        // },
        // update: (state, action) => {
        //     const postToUpdate = state.entries.find(post => post.id == action.payload.id);
        //     if (postToUpdate) {
        //         postToUpdate.name = action.payload.name;
        //         postToUpdate.description = action.payload.description;
        //         postToUpdate.author = action.payload.author;
        //         localStorage.setItem('entries', JSON.stringify(state.entries));
        //     }
        // },
        // remove: (state, action) => {
        //     state.entries = state.entries.filter(post => post.id != action.payload);
        //     localStorage.setItem('entries', JSON.stringify(state.entries));
        // }
    },
    extraReducers: (builder) => {
        // 3. add extra reducers, extraReducer handle lifecycle phases like pending, fulfilled, rejected.

        builder
            // for post thunk
            .addCase(createPostThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries.push(action.payload);
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.status = "failed";
                // 6. action.payload will be a vehicle either carrying data or error returned by rejectWithValue() method
                state.error = action.payload;
            })
            // for get thunk
            .addCase(getPostThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getPostThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries = action.payload;
            })
            .addCase(getPostThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // update thunk
            .addCase(updatePostThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePostThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries = state.entries.map(entry => entry.id === action.payload.id ? action.payload : entry);
            })
            .addCase(updatePostThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // delete thunk
            .addCase(deletePostThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries = state.entries.filter(entry => entry.id !== action.payload);
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

    }

});

// export const { create, update, remove } = postSlice.actions;

export default postSlice.reducer;