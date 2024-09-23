"use client";

import React from "react";
import { useQuestions } from "../../context/questionsContext";
import { FlashCard } from "../../components/sections/card";
import Header from "../../components/sections/header";
import Link from "next/link";

const Page: React.FC = () => {
  const { cards } = useQuestions();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-10 py-20">
      <Header
        title="Your Personal Question Vault"
        description="Store, review, and organize all your customized questions in one place for easy and effective revision."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
        {cards.length === 0 ? (
          <div className="w-full col-span-3 font-semibold">
            No questions to display. Start by {" "}
            <Link href={"/questions"} className="text-semibold text-blue-500" >uploading a document.</Link>
          </div>
        ) : (
          <>
            {cards.map((card, index) => (
              <FlashCard
                key={`${index}${card.question}`}
                card={card}
                editable
                index={index}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
