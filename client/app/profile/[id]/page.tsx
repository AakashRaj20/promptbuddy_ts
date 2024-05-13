"use client";

import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux_store/hooks";
import {
  fetchLoggedUserPosts,
  loggedUserPrompts,
} from "@/redux_store/slices/loggedUserPostsSlice";
import Profile from "@/components/Profile";
import { useEffect } from "react";

const UserProfile = ({ params }: any) => {
  const dispatch = useAppDispatch();
  const param = useSearchParams();
  const userName = param.get("name");
  const loggedPrompt = useAppSelector(loggedUserPrompts);

  useEffect(() => {
    dispatch(fetchLoggedUserPosts({ userId: params.id }));
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={loggedPrompt}
    />
  );
};

export default UserProfile;
