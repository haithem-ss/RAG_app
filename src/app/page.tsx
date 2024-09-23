import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../components/ui/badge";
import HowToUse from "../components/sections/how-to-use";

export default function Home() {
  return (
    <>
      <section className=" w-full h-[calc(100vh-4rem)] flex ">
        <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="text-sm py-2">
              <span className="mr-2 text-primary">
                <Badge>New</Badge>
              </span>
              <span> v1 is out now! </span>
            </Badge>

            <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
              <h1>
                Revise,
                <span className="text-transparent px-1 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                  Practice
                </span>
                , Excel
              </h1>
            </div>

            <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
              {`Upload your PDFs, generate personalized questions, and take customized practice tests. Turn your study materials into an interactive learning experience and watch your knowledge grow.`}
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Link href="/collection">
                <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
                  Get Started
                  <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                asChild
                variant="secondary"
                className="w-5/6 md:w-1/4 font-bold"
              >
                <Link
                  href="https://github.com/nobruf/shadcn-landing-page.git"
                  target="_blank"
                >
                  Github respository
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <HowToUse />
    </>
  );
}
