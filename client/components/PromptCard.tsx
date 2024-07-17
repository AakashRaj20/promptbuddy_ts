"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAppSelector, useAppDispatch } from "@/redux_store/hooks";
import { deletePromt } from "@/redux_store/slices/loggedUserPostsSlice";
import { selectUserAuth } from "@/redux_store/slices/userAuthSlice";
import {
  savedPrompts,
  removeSavedPrompt,
} from "@/redux_store/slices/savedPromptSlice";
import { Prompts } from "@/redux_store/slices/allPromptsSlice";
import SocialShareBox from "./SocialShareBox";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/redux_store/baseUrl";
import { deletePromptApi } from "@/server_action/deleteApi";

interface PromptCardProps {
  post: Prompts;
  handleTagClick?: (tagName: string) => void;
}

const PromptCard = ({ post, handleTagClick }: PromptCardProps) => {
  const userAuth = useAppSelector(selectUserAuth);
  const savedPrompt = useAppSelector(savedPrompts);
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [copied, setCopied] = useState<boolean | string>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isUpVoted, setIsUpVoted] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(post.votes);

  const promptUrl = `${window.location.origin}/prompt/${post._id}?prompt=${post.prompt}?username=${post.creator?.username}$userimage=${post.creator?.image}`;
  console.log({ post });

  useEffect(() => {
    const voteStatus =
      userAuth && post?.votedBy?.some((vote) => vote === userAuth.session?._id);
    console.log({ voteStatus });

    setIsUpVoted(voteStatus);
  }, [userAuth, post]);

  useEffect(() => {
    const saveStatus =
      userAuth &&
      savedPrompt?.prompts?.some((prompt) => prompt._id === post._id);
    setIsSaved(saveStatus);
  }, [userAuth, post, savedPrompt]);

  useEffect(() => {
    dispatch(removeSavedPrompt({ promptId: post._id }));
  }, [post._id]);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleVote = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/user/${post.creator?._id}/prompt/${post?._id}/vote`
      );
      if (res.status === 200) {
        setVoteCount(res.data.votes);
        setIsUpVoted(res.data.votedBy.includes(userAuth.session?._id));
      }
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/user/${userAuth?.session?._id}/prompt/${post._id}/save-unsave`
      );
      if (response.status === 200) {
        setIsSaved(!isSaved);
      }
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
     // Dispatch removeSavedPrompt for prompts that are not saved anymore
     if (!isSaved) {
       dispatch(removeSavedPrompt({ promptId: post._id }));
     }
   }, [isSaved, post._id, dispatch]);

  console.log({ isSaved });

  const handleEdit = async () => {
    router.push(`/update-prompt?promptId=${post._id}`);
  };

  const handleDelete = async () => {
    dispatch(deletePromt(post._id));
    deletePromptApi(post._id);
  };

  const handleProfileClick = () => {
    if (post?.creator?._id === userAuth.session._id)
      return router.push(`/profile?username=${userAuth.session.username}&?userimage=${userAuth.session.image}`);

    router.push(`/profile/${post.creator?._id}?name=${post.creator?.username}&?image=${post.creator?.image}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-4">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 dark:text-white">
              {post.creator?.username}
            </h3>
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700 dark:text-white">
        {post.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      <div className="flex justify-between mt-4">
        <div className="copy_btn">
          <div className="flex gap-4">
            <Image
              onClick={handleVote}
              src={
                !isUpVoted || voteCount === 0
                  ? "/assets/icons/thumbUp.svg"
                  : "/assets/icons/thumbsUp.svg"
              }
              alt="thumbsUp_icon"
              width={40}
              height={40}
            />
            <p>{voteCount}</p>
          </div>
        </div>
        <div className="copy_btn">
          <SocialShareBox url={promptUrl} />
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>

        {userAuth && (
          <div className="copy_btn" onClick={handleSave}>
            <Image
              src={
                isSaved === true
                  ? "/assets/icons/saved.svg"
                  : "/assets/icons/save.svg"
              }
              alt="save_icon"
              width={20}
              height={20}
            />
          </div>
        )}
      </div>

      {userAuth?.session?._id === post.creator?._id &&
        pathName === "/profile" && (
          <div className="mt-5 flex justify-between border-t border-gray-400 pt-5">
            <Button
              className="font-inter text-sm green_gradient rounded-full px-7 hover:border-green-400"
              variant="outline"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className="font-inter text-sm orange_gradient rounded-full px-7 hover:border-orange-400"
              onClick={() => handleDelete()}
              variant="outline"
            >
              Delete
            </Button>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
