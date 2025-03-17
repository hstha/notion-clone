"use client";

import { useScrollTop } from "@/hooks";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui";
import Spinner from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "shadow-sm",
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button size="sm">Get Jotion free</Button>
            </SignUpButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm">
              <Link href="/documents">Enter Jotion</Link>
            </Button>

            <UserButton />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
