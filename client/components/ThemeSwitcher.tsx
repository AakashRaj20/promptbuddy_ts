"use client";

import Image from "next/image";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      // src={
      //   resolvedTheme === "dark"
      //     ? "/assets/icons/light_mode.svg"
      //     : "/assets/icons/dark_mode.svg"
      // }
      // alt="light mode"
      // width={40}
      // height={40}
    />
  );
};

export default ThemeSwitch;
