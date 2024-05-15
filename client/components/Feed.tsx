"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux_store/hooks";
import PromptCardList from "./PromptCardList";
import { Prompts } from "@/redux_store/slices/allPromptsSlice";
import { fetchAllPrompts, selectAllPrompts } from "@/redux_store/slices/allPromptsSlice";
import { selectUserAuth } from "@/redux_store/slices/userAuthSlice";
import { fetchSavedPrompts } from "@/redux_store/slices/savedPromptSlice";
import { Input } from "./ui/input";

const Feed = () => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(selectUserAuth);

  const allPrompt: Prompts[] = useAppSelector(selectAllPrompts);
  
  useEffect(() => {
    dispatch(fetchAllPrompts());
  }, []);

  useEffect(() => {
    dispatch(fetchSavedPrompts({ userId: userAuth?.session?._id }));
  },[userAuth?.session?._id])

  return (
    <section className="flex flex-col items-center justify-center gap-7 w-full">
      <form className="relative max-w-[55rem] w-full flex-center">
        <Input
          type="text"
          placeholder="Search for a tag or a username"
          //   value={searchText}
          //   onChange={handleSearchChange}
          required
          className="shadow-xl h-[50px] rounded-lg dark:bg-white dark:focus:outline-none mt-5"
        />
      </form>
      <PromptCardList data={allPrompt} />
    </section>
  );
};

export default Feed;
