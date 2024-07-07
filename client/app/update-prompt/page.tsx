"use client";

import FormUI from "@/components/Form";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/redux_store/baseUrl";

interface EditPromptProps {
  prompt: string;
  tag: string;
}

const EditPrompt = () => {
  const param = useSearchParams();
  const router = useRouter();
  const promptId = param.get("promptId");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<EditPromptProps>({
    prompt: "",
    tag: "",
  });

  console.log({ promptId });

  useEffect(() => {
    const getPromptdetails = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/prompt/${promptId}`);
        setPrompt({
          prompt: res.data.prompt,
          tag: res.data.tag,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPromptdetails();
  }, []);

  console.log({ prompt });

  const updatePrompt = async () => {
    setSubmitting(true);
    try {
      const response = await axios.patch(
        `${baseUrl}/api/edit-prompt/${promptId}`,
        { prompt: prompt.prompt, tag: prompt.tag }
      );
      //return response.data;

      console.log({ response });
      
      if (response.statusText === "OK") {
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormUI
      type="Edit"
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
