"use client";

import { useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Dices, Loader, SendIcon } from "lucide-react";
import { prompts } from "@/lib/data";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useReward } from "react-rewards";

interface Props {
  userId: string;
}

const Form = ({ userId }: Props) => {
  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    lifetime: 200,
    elementCount: 90,
    spread: 70,
    zIndex: 9999,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    reward();
    const content = message;
    try {
      if (!content) {
        toast.warning("Oopsie😕, the Message is blank...", {
          description: "Type in something and send again!🔥🤩",
        });
      } else {
        await fetch("/api/messages", {
          method: "POST",
          body: JSON.stringify({ content, userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMessage("");
        toast.success("Message is sent successfully 💌 and anonymously!", {
          description: "Create your account to get your messages!🔥🤩",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message 😕", {
        description: "Please try again later!🔥🤩",
      });
    } finally {
      setLoading(false);
    }
  };

  function getRandom() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setMessage(prompts[randomIndex]);
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full relative z-10">
        <span id="rewardId" className="absolute top-0 left-1/2 -translate-x-1/2" />

        <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden mt-4">
          <Textarea
            placeholder="Type your anonymous message..."
            value={message}
            className="w-full min-h-[160px] border-none bg-white text-slate-900 p-6 text-lg font-medium focus-visible:ring-indigo-500 placeholder:text-slate-400 leading-relaxed resize-none"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            title="Get Random Prompt"
            className="absolute bottom-4 right-4 p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-2xl transition-all active:scale-95 group shadow-sm border border-indigo-100"
            onClick={getRandom}
          >
            <Dices className="size-6 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        <Button
          type="submit"
          className="mt-8 font-extrabold text-xl h-16 w-full max-w-[280px] rounded-full shadow-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all active:scale-95 disabled:grayscale"
          size="lg"
          disabled={loading || isAnimating}
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              Send Message <SendIcon className="ml-3 size-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Form;
