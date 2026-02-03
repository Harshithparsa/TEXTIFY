import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Clarity from "@/components/Clarity";
import { ThemedToaster, ThemeProvider } from "@/components/ThemeProvider";
import { funnel } from "@/lib/font";

export const metadata: Metadata = {
  title: "Textify",
  description: "Send Anonymous Messages to your Friends!🤩",
  metadataBase: new URL("https://textify.vercel.app"),
  authors: [
    {
      name: "Anish",
      url: "https://anish7.me",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://textify.vercel.app",
    title: "Textify",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};
export const viewport: Viewport = {
  themeColor: "#744FEE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#6C47FF" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={funnel.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableColorScheme={false}>
            <Clarity />
            {children}
            <ThemedToaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
