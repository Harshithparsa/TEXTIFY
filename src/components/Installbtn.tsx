"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import install from "@/../public/install.svg";
import usePwa from "use-pwa";
import { Button } from "./ui/button";

const InstallBtn = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { appinstalled, canInstallprompt, isLoading, showInstallPrompt } = usePwa();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !canInstallprompt || appinstalled || isLoading) return null;

  return (
    <Button
      type="button"
      onClick={showInstallPrompt}
      variant={"outline"}
      className={className}
    >
      Install <Image src={install} alt="app" width={18} className="dark:invert" />
    </Button>
  );
};

export default InstallBtn;
