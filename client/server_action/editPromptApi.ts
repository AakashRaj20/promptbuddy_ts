"use server"

import axios from "axios";
import { baseUrl } from "@/redux_store/baseUrl";

interface EditPromptProps {
  id: string | null;
  prompt: string;
  tag: string;
}

export const editPromptById = async ({ id, prompt, tag }: EditPromptProps) => {
  try {
    const response = await axios.patch(`${baseUrl}/api/edit-prompt/${id}`, {
      prompt,
      tag,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
