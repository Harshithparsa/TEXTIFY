"use client";

import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <div className="p-0 shadow border-b border-border/50 justify-center items-center sticky top-0 z-50 min-w-full bg-background/80 backdrop-blur-xl rounded-b-[2rem]">
      <div className="max-w-6xl m-auto items-center flex flex-wrap justify-between px-6 py-3">
        <div>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 group transition-all"
          >
            <h1 className="text-4xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-400 logo group-hover:opacity-80 transition-opacity">
              Textify
            </h1>
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "2.75rem",
                  height: "2.75rem",
                  border: "2px solid hsl(var(--primary)/0.2)",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
