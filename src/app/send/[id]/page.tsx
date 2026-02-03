import Form from "@/components/Form";
import { VenetianMask } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clerkClient } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
const InstallBtn = dynamic(() => import("@/components/Installbtn"), {
  ssr: false,
  loading: () => <p className="text-white">Install Now!🔥</p>,
});

const SendMessages = async ({ params }: any) => {
  const { id } = await params;
  const user = await (await clerkClient()).users.getUser(id);
  const initials =
    user.firstName && user.lastName
      ? user.firstName[0] + user.lastName[0]
      : "TZ";
  const username = user.firstName === null ? "TextifyUser" : user.firstName;
  const avImg = user.hasImage
    ? user.imageUrl
    : "https://i.postimg.cc/Kcp57cXf/apple-touch-icon.png";

  return (
    <div className="text-white flex min-h-screen flex-col items-center justify-center pt-20 pb-4 px-4 bg-gradient-to-br from-indigo-700 via-blue-800 to-teal-600 text-center relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="fixed top-0 md:right-40 text-black z-50">
        <InstallBtn />
      </div>
      <h2 className="text-6xl md:text-9xl font-bold p-2 textify logo">Textify</h2>
      <div className="bg-white/90 flex gap-3 px-4 py-3 mont text-zinc-900 mt-3 sm:w-5/12 min-w-[220px] w-full rounded-t-2xl items-center leading-tight text-start shadow-xl">
        <Avatar>
          <AvatarImage src={avImg} alt={initials} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="md:text-base text-sm text-zinc-600 font-medium">
            @{username}
          </p>
          <p className="font-semibold md:text-lg mont">
            Send anonymous messages here 💌
          </p>
        </div>
      </div>

      <Form userId={id} />

      <div className="flex flex-col mt-20 text-center">
        <h1 className="font-medium mont md:text-xl max-w-prose">
          What are you waiting for? Start getting anonymous messages now! 🔥
        </h1>
        <Link
          href="/"
          className="animate-shake p-2 px-6 mt-5 mx-auto rounded-md bg-white text-indigo-700 text-center font-bold shadow-lg"
        >
          Lets Goo!🚀
        </Link>
      </div>

      <Link
        href="/about"
        title="About Textify"
        className="absolute bg-white/20 backdrop-blur-md bottom-2 right-1 p-2 rounded-full cursor-pointer hover:bg-white/30 transition-colors"
      >
        <VenetianMask color="white" size={28} />
      </Link>
    </div>
  );
};

export default SendMessages;
