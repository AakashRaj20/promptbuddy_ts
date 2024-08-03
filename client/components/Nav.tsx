"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./ThemeSwitcher";
import BottomBar from "./BottomBar";
import { usePathname, useRouter } from "next/navigation";
import { baseUrl } from "@/redux_store/baseUrl";
import { useAppDispatch, useAppSelector } from "@/redux_store/hooks";
import {
  fetchUserAuth,
  selectUserAuth,
} from "@/redux_store/slices/userAuthSlice";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect } from "react";
import axios from "axios";

const Nav = () => {
  const userAuth = useAppSelector(selectUserAuth);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      });
      console.log(res.data);
      router.push("/signin")
    } catch (error) {
      console.log(error);
    }
  };

  const pathName = usePathname();

      console.log(userAuth ? userAuth.session : "No user");


  useEffect(() => {
    dispatch(fetchUserAuth());
  }, []);

  return (
    <nav className="flex-between flex w-full mb-8 pt-3 items-center">
      <div className="flex gap-11 items-center">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <p className="logo_text orange_gradient">PromptBuddy</p>
        </Link>
        <div className="cursor-pointer sm:flex hidden items-center">
          <ThemeSwitch />
        </div>
      </div>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {userAuth ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt">
              <Button
                onClick={() => router.push("/create-prompt")}
                variant="outline"
                className="dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">Create Post</span>
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10">Sign Out</span>
            </Button>

            <Image
              src={
                userAuth ? userAuth.session?.image : "/assets/icons/profile.svg"
              }
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() =>
                router.push(
                  `/profile?username=${userAuth.session.username}?userimage=${userAuth.session.image}`
                )
              }
            />
          </div>
        ) : (
          <>
            {pathName !== "/signin" && (
              <Button
                onClick={handleSignIn}
                variant="outline"
                className="dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">Sign In</span>
              </Button>
            )}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {userAuth ? (
          <ThemeSwitch />
        ) : (
          <>
            {userAuth === null && (
              <button
                type="button"
                onClick={handleSignIn}
                className="black_btn"
              >
                Sign in
              </button>
            )}
          </>
        )}
      </div>
      <BottomBar />
    </nav>
  );
};

export default Nav;
