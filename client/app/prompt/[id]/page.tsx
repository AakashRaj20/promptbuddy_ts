"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/redux_store/baseUrl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import PromptCard from "@/components/PromptCard";
import LoaderUI from "@/components/LoaderUI";
import { Prompts } from "@/redux_store/slices/allPromptsSlice";

const sharedPrompt = ({ params }: any) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`${baseUrl}/api/prompt/${params.id}`);
      const data = await response.json();
      setPost(data);
    };

    setIsDialogOpen(true);

    if (params.id) getPromptDetails();
  }, [params.id]);

  console.log(post);

  return post ? (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button className="hidden" variant="outline">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full border-none dark:bg-black/80 p-0 xs:mx-auto rounded-lg">
        <PromptCard post={post} dialougeStyle="dialouge_prompt_card" />
        <DialogFooter className="sm:justify-start flex flex-col">
          <div className="flex flex-col gap-5 p-6 w-full items-center">
            <DialogDescription>
              Click on the button below to see more amazing prompts
            </DialogDescription>
            <DialogClose asChild>
              <Button
                type="button"
                className="black_btn w-full"
                onClick={() => router.push("/")}
              >
                Discover Prompts
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <LoaderUI />
  );
};

export default sharedPrompt;
