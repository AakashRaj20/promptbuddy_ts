"use client";
import { Prompts, selectAllPromptsLoading } from "@/redux_store/slices/allPromptsSlice";
import { useAppSelector } from "@/redux_store/hooks";
import Loader from "./LoaderUI";
import PromptCard from "./PromptCard";


interface PromptCardProps {
  data: Prompts[];
}

const PromptCardList = ({data} : PromptCardProps) => {
  const isPromptLoading = useAppSelector(selectAllPromptsLoading);
  return isPromptLoading ? <Loader /> : (
    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {data &&
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            //handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
}

export default PromptCardList
