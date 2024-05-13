import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./slices/userAuthSlice";
import allPromptsSlice from "./slices/allPromptsSlice";
import savedPromptSlice from "./slices/savedPromptSlice";
import loggedUserPostsSlice from "./slices/loggedUserPostsSlice";

export const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        allPrompts: allPromptsSlice,
        savedPrompts: savedPromptSlice,
        loggedUserPosts: loggedUserPostsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;