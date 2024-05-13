import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../baseUrl";
import { Prompts } from "./allPromptsSlice";
import axios from "axios";
import { RootState } from "../store";

interface UserId {
    userId: string
}

export const fetchLoggedUserPosts = createAsyncThunk(
  "loggedUserPosts/fetchLoggedUserPosts",
  async ({ userId } : UserId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/${userId}/posts`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

interface LoggerUserPrompts {
  loggedUserPrompts: Prompts[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: LoggerUserPrompts = {
  loggedUserPrompts: [],
  loading: false,
  error: null,
};

const loggedUserPostsSlice = createSlice({
  name: "loggedUserPosts",
  initialState,
  reducers: {
    deletePromt: (state, action) => {
      const promptId = action.payload;
      state.loggedUserPrompts = state.loggedUserPrompts.filter(
        (prompt) => prompt._id !== promptId
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoggedUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoggedUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedUserPrompts = action.payload;
    });
    builder.addCase(fetchLoggedUserPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default loggedUserPostsSlice.reducer;
export const loggedUserPrompts = (state: RootState) =>
  state.loggedUserPosts.loggedUserPrompts;
export const loggedUserLoading = (state: RootState) =>
  state.loggedUserPosts.loading;
export const loggedUserError = (state: RootState) =>
  state.loggedUserPosts.error;
export const { deletePromt } = loggedUserPostsSlice.actions;
