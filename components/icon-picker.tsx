"use client";

import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui";

interface Props {
  onChange: (value: string) => void;
  asChild?: boolean;
  children: React.ReactNode;
}

const IconPicker = ({ onChange, asChild, children }: Props) => {
  const { resolvedTheme } = useTheme();

  const themeMap = {
    light: Theme.LIGHT,
    dark: Theme.DARK,
  };

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(code) => onChange(code.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
