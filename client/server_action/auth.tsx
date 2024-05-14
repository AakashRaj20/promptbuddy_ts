"use server"
import { baseUrl } from "@/redux_store/baseUrl";

export const handleSignIn = () => {
  window.open(`${baseUrl}/auth/google`, "_self");
};
