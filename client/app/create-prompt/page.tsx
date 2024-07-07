"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/redux_store/baseUrl";
import { useAppSelector } from "@/redux_store/hooks";
import { selectUserAuth } from "@/redux_store/slices/userAuthSlice";
import FormUI from "@/components/Form";
import axios from "axios";

const CreatePrompt = () => {
  const router = useRouter();
  const userAuth = useAppSelector(selectUserAuth);
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });


  const createPrompt = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${baseUrl}/api/create-prompt`, {
        prompt: post.prompt,
        tag: post.tag,
        userId: userAuth.session?._id,
      });

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormUI
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
