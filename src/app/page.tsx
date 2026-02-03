import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import emojis from "@/app/assets/emojis.png";
import img2 from "@/app/assets/3dcartn.png";
import cloud from "@/app/assets/cloud.png";
import rocket from "@/app/assets/rocket.png";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 dark:from-slate-950 to-background">
      <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-3xl px-1 logo font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-400">
            Textify
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="hover:text-primary"
              asChild
            >
              <Link href={"/about"}>About</Link>
            </Button>
            <Button asChild className="rounded-full px-6">
              <Link href={"/sign-up"}>Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="pb-16 md:px-4">
        <div className="mx-auto space-y-40">
          <HeroSection />
          <section className="max-w-6xl mx-auto px-2">
            <h2 className="text-center mb-12 text-6xl tracking-tighter font-bold bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="col-span-full group flex items-end lg:col-span-3 h-72 relative bg-gradient-to-br from-indigo-500 to-blue-400 overflow-hidden border-none shadow-lg">
                <Image
                  src={img2}
                  alt="Feature 1"
                  width={500}
                  height={500}
                  className="absolute group-hover:-translate-x-12 duration-500 object-cover object-top -translate-x-40 bottom-0 md:-translate-x-20 drop-shadow-2xl"
                />
                <div className="space-y-4 mt-auto text-end ml-auto p-8 relative z-10">
                  <h3 className="text-2xl md:text-4xl tracking-tighter font-bold text-white">
                    Complete Anonymity
                  </h3>
                  <p className="max-w-xs leading-snug text-blue-50 font-medium">
                    Get totally anonymous messages from your friends and family without any trace.
                  </p>
                </div>
              </Card>

              <Card className="flex h-64 items-end group md:h-full bg-gradient-to-br from-teal-500 to-emerald-400 col-span-full lg:col-span-2 relative border-none shadow-lg">
                <Image
                  src={cloud}
                  alt="cloud"
                  width={200}
                  height={200}
                  className="absolute size-40 md:size-48 -top-6 z-0 group-hover:scale-105 group-hover:-top-12 duration-500 drop-shadow-xl"
                />
                <div className="space-y-4 mt-auto text-end ml-auto p-8 relative z-10">
                  <h3 className="text-2xl md:text-3xl tracking-tighter text-white font-bold">
                    Saved on the Cloud
                  </h3>
                  <p className="pl-10 max-w-sw leading-snug text-teal-50 font-medium">
                    Access your messages from anywhere in the world, anytime.
                  </p>
                </div>
              </Card>

              <Card className="flex group items-end h-64 bg-gradient-to-br from-blue-600 to-indigo-500 col-span-full lg:col-span-2 relative border-none shadow-lg">
                <Image
                  src={rocket}
                  alt="rocket"
                  width={200}
                  height={200}
                  className="absolute size-56 -top-10 -left-4 z-0 group-hover:scale-125
                   transition-all duration-500 drop-shadow-xl"
                />
                <div className="space-y-4 mt-auto text-end ml-auto px-8 py-6 relative z-10">
                  <h3 className="text-2xl md:text-3xl tracking-tighter text-white font-bold">
                    Build for Scalability
                  </h3>
                  <p className="max-w-xs leading-snug text-blue-50 font-medium">
                    Engineered for speed and high performance messaging.
                  </p>
                </div>
              </Card>

              <Card className="flex group items-end h-64 bg-gradient-to-br from-emerald-500 to-teal-400 col-span-full lg:col-span-3 relative border-none shadow-lg">
                <Image
                  src={emojis}
                  alt="emoji"
                  width={200}
                  height={200}
                  className="absolute size-40 md:size-60 -top-6 md:-top-10 left-2 md:left-8 z-0 group-hover:scale-110 group-hover:rotate-3 duration-500 drop-shadow-xl"
                />
                <div className="space-y-4 mt-auto text-end ml-auto px-8 py-6 relative z-10">
                  <h3 className="text-2xl md:text-4xl tracking-tighter text-white font-bold">
                    Social Ready
                  </h3>
                  <p className="max-w-xs leading-snug text-emerald-50 font-medium">
                    Built-in templates to share your link on Instagram and Snapchat easily.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          <section className="text-center px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-12 overflow-hidden bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-400/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative z-10 space-y-8">
                  <MessageSquare className="size-16 mx-auto text-blue-400 animate-bounce" style={{ animationDuration: '3s' }} />
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Ready to start messaging?
                  </h2>
                  <p className="text-xl text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Join the community of Textify users and start receiving anonymous messages today.
                  </p>
                  <Button
                    size="lg"
                    className="text-xl h-14 px-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                    asChild
                  >
                    <Link href={"/sign-up"}>
                      Let&apos;s Go!
                      <ArrowRight className="ml-2" size={24} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground font-medium">
          © 2024 Textify • Built for the social web.
        </div>
      </footer>
    </div>
  );
}
