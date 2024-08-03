import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { baseUrl } from "../baseUrl";
import axios from "axios";

interface UserAuthState {
  user: {
    session: {
      email: string;
      username: string;
      image: string;
      _id: string;
    };
  };
  loading: boolean;
  error: null | string | undefined;
}

const initialState: UserAuthState = {
  user: {
    session: {
      email: "",
      username: "",
      image: "",
      _id: "",
    },
  },
  loading: false,
  error: null,
};

export const fetchUserAuth = createAsyncThunk(
  "userAuth/fetchUserAuth",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/auth/signin/success`, {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": true,
        // },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userAuthSlice.reducer;
export const selectUserAuth = (state: RootState) => state.userAuth.user;
export const userAuthLoading = (state: RootState) => state.userAuth.loading;
export const userAuthError = (state: RootState) => state.userAuth.error;
