import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Prompts } from "./allPromptsSlice";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { RootState } from "../store";

interface SavedPrompt {
  userId: string;
}

export const fetchSavedPrompts = createAsyncThunk(
  "savedPrompts/fetchSavedPrompts",
  async ({userId}: SavedPrompt) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/${userId}/saved-prompts`
      );
      return response.data.prompts;
    } catch (error) {
      console.error(error);
    }
  }
);

interface SavedPrompts {
  savedPrompts: Prompts[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: SavedPrompts = {
  savedPrompts: [],
  loading: false,
  error: null,
};

const savedPromptSlice = createSlice({
  name: "savedPrompts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSavedPrompts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSavedPrompts.fulfilled, (state, action) => {
      state.loading = false;
      state.savedPrompts = action.payload;
    });
    builder.addCase(fetchSavedPrompts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default savedPromptSlice.reducer;
export const savedPrompts = (state: RootState) =>
  state.savedPrompts.savedPrompts;
export const savedPromptLoading = (state: RootState) =>
  state.savedPrompts.loading;
export const savedPrompterror = (state: RootState) =>
  state.savedPrompts.error;
