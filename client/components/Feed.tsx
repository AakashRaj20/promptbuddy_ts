"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux_store/hooks";
import PromptCardList from "./PromptCardList";
import { Prompts } from "@/redux_store/slices/allPromptsSlice";
import {
  fetchAllPrompts,
  selectAllPrompts,
} from "@/redux_store/slices/allPromptsSlice";
import { selectUserAuth } from "@/redux_store/slices/userAuthSlice";
import { fetchSavedPrompts } from "@/redux_store/slices/savedPromptSlice";
import { Input } from "./ui/input";

const Feed = () => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(selectUserAuth);

  const allPrompt = useAppSelector(selectAllPrompts);

  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<Prompts[]>([]);

  useEffect(() => {
    dispatch(fetchAllPrompts());
  }, []);

  useEffect(() => {
    dispatch(fetchSavedPrompts({ userId: userAuth?.session?._id }));
  }, [userAuth?.session?._id]);


  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPrompt.filter(
      (item: Prompts) =>
        regex.test(item.creator?.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchedResults(filterPrompts(searchText));
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchText]);

  return (
    <section className="flex flex-col items-center justify-center gap-7 w-full">
      <form className="relative max-w-[55rem] w-full flex-center">
        <Input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="shadow-xl h-[50px] rounded-lg dark:bg-white dark:focus:outline-none mt-5 text-black"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPrompt} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
