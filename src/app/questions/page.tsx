"use client";

import { use } from "react";
import Header from "../../components/sections/header";
import Messages from "../../components/sections/messages";
import MultiStepForm from "../../components/sections/multi-step-form";
import { useQuestions } from "../../context/questionsContext";

export default function Home() {
  const { collectionName } = useQuestions();
  return (
    <div className="h-[calc(100vh-4rem)] min-h-[600px] flex items-center justify-center flex-col gap-20">
      <Header
        title="Ask, Memorize, Repeat"
        description="Create a collection of flash cards from your documents. 
          Upload a document and we'll generate flash cards for you."
      />
      <div className=" w-full flex items-center justify-between gap-8">
        {collectionName === null ? <MultiStepForm /> : <Messages />}
      </div>
    </div>
  );
}
