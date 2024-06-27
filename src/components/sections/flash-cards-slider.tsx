"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuestions } from "../../context/questionsContext";
import { TestFlashCard } from "./card";
import { shuffleArray } from "../../lib/utils";
import Link from "next/link";

export function FlashCardsCarousel() {
  const { cards } = useQuestions();
  return (
    <>
      {cards.length === 0 ? (
        <div className="w-fit col-span-3 font-semibold">
          No questions to display. Start by{" "}
          <Link href={"/questions"} className="text-semibold text-blue-500">
            uploading a document.
          </Link>
        </div>
      ) : (
        <>
          <Carousel className="w-full">
            <CarouselContent>
              {shuffleArray(cards).map((card, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <TestFlashCard card={card} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </>
  );
}
