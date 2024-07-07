import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { baseUrl } from "../baseUrl";
import axios from "axios";

export interface Prompts {
  creator: {
    username: string;
    image: string;
    _id: string;
  };
  prompt: string;
  tag: string;
  votes: number;
  votedBy: string[];
  _id: string;
}

interface AllPromptsState {
  prompts: Prompts[];
  isLoading: boolean;
  errMess: string | null | undefined;
}

export const fetchAllPrompts = createAsyncThunk(
  "allPrompts/fetchAllPrompts",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/prompts`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: AllPromptsState = {
  prompts: [],
  isLoading: false,
  errMess: null,
};

const allPromptsSlice = createSlice({
    name: "allPrompts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPrompts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllPrompts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.prompts = action.payload;
        });
        builder.addCase(fetchAllPrompts.rejected, (state, action) => {
            state.isLoading = false;
            state.errMess = action.error.message;
        });
    }
});

export default allPromptsSlice.reducer;
export const selectAllPrompts = (state: RootState) => state.allPrompts.prompts;
export const selectAllPromptsLoading = (state: RootState) => state.allPrompts.isLoading;
export const selectAllPromptsErrMess = (state: RootState) => state.allPrompts.errMess;
