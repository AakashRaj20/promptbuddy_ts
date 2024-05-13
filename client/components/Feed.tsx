"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux_store/hooks";
import PromptCardList from "./PromptCardList";
import { Prompts } from "@/redux_store/slices/allPromptsSlice";
import { fetchAllPrompts, selectAllPrompts } from "@/redux_store/slices/allPromptsSlice";

const Feed = () => {
  const dispatch = useAppDispatch();

  const allPrompt: Prompts[] = useAppSelector(selectAllPrompts);
  
  useEffect(() => {
    dispatch(fetchAllPrompts());
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-7 w-full">
      <form className="relative max-w-[55rem] w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          //   value={searchText}
          //   onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={allPrompt} />
    </section>
  );
};

export default Feed;
