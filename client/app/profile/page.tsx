"use client";
import { useAppDispatch, useAppSelector } from "@/redux_store/hooks";
import {
  selectUserAuth,
  userAuthLoading,
} from "@/redux_store/slices/userAuthSlice";
import {
  fetchLoggedUserPosts,
  loggedUserPrompts,
} from "@/redux_store/slices/loggedUserPostsSlice";
import Profile from "@/components/Profile";
import { useEffect } from "react";

const MyProfile = () => {
  const userAuth = useAppSelector(selectUserAuth);
  const isUserLoading = useAppSelector(userAuthLoading);
  const loggedPrompts = useAppSelector(loggedUserPrompts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoggedUserPosts({ userId: userAuth?.session?._id }));
  }, [isUserLoading]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={loggedPrompts}
    />
  );
};

export default MyProfile;
