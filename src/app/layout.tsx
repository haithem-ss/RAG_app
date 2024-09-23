import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/sections/navbar";
import QuestionsProvider from "../context/questionsContext";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "../lib/utils";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revise,Practice, Excel",
  description:
    "Upload your PDFs, generate personalized questions, and take customized practice tests. Turn your study materials into an interactive learning experience and watch your knowledge grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "xl:!px-40 lg:!px-20 md:!px-10 !px-6 max-w-[1600px] m-auto"
        )}
      >
        <Analytics />
        <Navbar />
        <Toaster />
        <QuestionsProvider>{children}</QuestionsProvider>
        <footer className="max-w-[1600px] m-auto border-t border-black py-5">
          <div className="">© 2024 SAIDA haithem. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
