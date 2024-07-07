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

const SharedPrompt = ({ params }: any) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [post, setPost] = useState<Prompts>();

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`${baseUrl}/api/prompt/${params.id}`);
      const data = await response.json();
      setPost(data);
    };

    setIsDialogOpen(true);

    if (params.id) getPromptDetails();
  }, [params.id]);

  console.log({ post });

  return post ? (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button className="hidden" variant="outline">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full border-none dark:bg-black/80 p-0 xs:mx-auto rounded-lg">
        <PromptCard post={post} />
        <DialogFooter className="sm:justify-start flex flex-col">
          <div className="flex flex-col gap-5 p-6 w-full items-center">
            <DialogDescription>
              Click on the button below to see more amazing prompts
            </DialogDescription>
            <DialogClose
              className="focus:outline-none dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full"
              asChild
            >
              <Button
                variant="outline"
                className="w-full rounded-full py-6 text-lg font-bold"
                onClick={() => router.push("/")}
              >
                <span className="relative z-10">Discover Prompts</span>
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

export default SharedPrompt;
