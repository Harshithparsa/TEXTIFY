"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, TrashIcon, Eye } from "lucide-react";
import { useState } from "react";
import Message from "./Message";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useReward } from "react-rewards";

interface Props {
  message: string;
  messageId: string;
  sentAt: string;
  seen: boolean;
}

const Cards = ({ message, sentAt, messageId, seen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isSeen, setIsSeen] = useState(seen);
  const [deleted, setDeleted] = useState(false);
  const { reward } = useReward("rewardId", "confetti", {
    lifetime: 200,
    elementCount: 90,
    spread: 70,
    zIndex: 9999,
  });

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    setLoading(true);
    try {
      await fetch("api/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: messageId }),
      });
      setDeleted(true);
      toast.success("Message deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSeen() {
    try {
      reward();
      setIsSeen(true);
      fetch("api/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: messageId }),
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  if (deleted) {
    return null;
  }

  return isSeen ? (
    <Dialog>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
        <DialogTrigger asChild>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="line-clamp-2 text-lg font-medium text-foreground/90 leading-tight flex-1">
                {message}
              </p>
              <div className="bg-primary/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="size-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </DialogTrigger>
        <Separator className="opacity-50" />
        <CardFooter className="flex justify-between py-3 px-6 bg-muted/30">
          <CardDescription className="text-xs font-medium uppercase tracking-wider">{sentAt}</CardDescription>
          <Button
            title="Delete Message"
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            disabled={loading}
            className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-full"
          >
            {!loading ? (
              <TrashIcon size={18} className="text-muted-foreground transition-colors group-hover:text-destructive" />
            ) : (
              <Loader2 size={16} className="animate-spin" />
            )}
          </Button>
        </CardFooter>
        <span id="rewardId" />
      </Card>

      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-lg w-[95vw]">
        <DialogTitle className="sr-only">Message from Textify</DialogTitle>
        <Message message={message} />
      </DialogContent>
    </Dialog>
  ) : (
    <Card
      className="group relative h-40 overflow-hidden rounded-3xl cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-none shadow-lg"
      onClick={handleSeen}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-teal-500 group-hover:scale-110 transition-transform duration-700"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>

      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <h2 className="logo text-5xl md:text-6xl text-white textify drop-shadow-lg mb-2">Textify</h2>
        <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-[10px] bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm group-hover:bg-black/40 transition-colors">
          <Eye size={12} /> Click to reveal
        </div>
      </div>
    </Card>
  );
};

export default Cards;
