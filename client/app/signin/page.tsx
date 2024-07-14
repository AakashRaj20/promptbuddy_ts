"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Mail, Github } from "lucide-react";
import { baseUrl } from "@/redux_store/baseUrl";

const page = () => {
  const handleGoogleSignIn = () => {
    window.open(`${baseUrl}/auth/google`, "_self");
  };

  const handleGithubSignIn = () => {
    window.open(`${baseUrl}/auth/github`);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 w-full border-2 dark:border-none rounded-lg">
      <div className="w-full gap-4 bg-white/40 dark:bg-black/30 flex flex-col items-center justify-center rounded-t-xl lg:rounded-l-lg py-5">
        <h1 className="orange_gradient text-4xl lg:text-6xl tracking-wider font-bold">
          PromptBuddy
        </h1>
        <p className="text-lg md:text-xl text-center font-bold">
          Discover and Share Amazing AI Prompts
        </p>

        <Image
          src="/assets/images/signin.gif"
          alt="hero"
          width={250}
          height={250}
          className="object-contain bg-transparent block lg:hidden"
        />
        <Image
          src="/assets/images/signin.gif"
          alt="hero"
          width={500}
          height={500}
          className="object-contain bg-transparent hidden lg:block"
        />
      </div>
      <div className="flex flex-col items-center justify-center bg-white/70 dark:bg-black/70 w-full px-3 lg:px-10 pt-5 pb-24 lg:py-56 gap-8 rounded-b-xl lg:rounded-r-lg">
        <h1 className="green_gradient text-3xl lg:text-5xl font-bold text-center">
          Sign in to PromptBuddy
        </h1>
        <p className="font-medium text-lg text-center">
          Sign in to create and share amazing prompts with the world
        </p>
        <div className="flex flex-col gap-5 max-w-[35rem] w-full">
          <Button
            onClick={handleGoogleSignIn}
            className="gap-4 bg-black font-bold text-lg hover:bg-neutral-900 py-6"
          >
            <Mail />
            Sign in with Gmail
          </Button>
          <div className="grid grid-cols-3 items-center text-center">
            <Separator className="dark:bg-neutral-500 bg-black/50" />
            <p className="text-sm lg:text-lg font-medium">or continue with</p>
            <Separator className="dark:bg-neutral-500 bg-black/50" />
          </div>
          <Button
            onClick={handleGithubSignIn}
            className="gap-4 bg-black font-bold text-lg hover:bg-neutral-900 py-6"
          >
            <Github />
            Sign in with Github
          </Button>
        </div>
      </div>
    </section>
  );
};

export default page;
