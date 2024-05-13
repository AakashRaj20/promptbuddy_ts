"use server";

import axios from "axios";
import { baseUrl } from "@/redux_store/baseUrl";

export const deletePromptApi = async (promptId: string) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/delete-prompt/${promptId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
