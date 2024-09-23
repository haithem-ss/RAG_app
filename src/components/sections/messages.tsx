"use client";

import { Button } from "../ui/button";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RHFInput from "../rhf/RHFInput";
import { Form } from "../ui/form";
import { Card, useQuestions } from "../../context/questionsContext";
import { useState } from "react";
import { FlashCard } from "./card";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../ui/use-toast";

const schema = z.object({
  question: z.string().nonempty("Question is required"),
});

async function getAnswer(collectionName: string, question: string) {
  const url = new URL("https://rag-haithemss.vercel.app/api/collection/" + collectionName);
  url.searchParams.append("question", question);

  const response = await fetch(url, {});
  if (response.ok) {
    const data = await response.json();
    if (data.answer === "")
      throw new Error("No answer found, try another question");
    return data.answer;
  }
  throw new Error("Failed to fetch answer");
}

export default function () {
  const { toast } = useToast();

  const { addCard, collectionName } = useQuestions();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const [latestCard, setLatestCard] = useState<Card | null>(null);

  const onSubmit: (data: any) => Promise<void> = async (data) => {
    try {
      const question: string = data.question;
      const answer = await getAnswer(collectionName!, question);
      setLatestCard({ question, answer });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Failed to fetch answer",
      });
    }
  };

  const handleAddToCollection = () => {
    addCard(latestCard!);
    form.setValue("question", "");
    setLatestCard(null);
  };

  const handleSkip = () => {
    form.setValue("question", "");
    setLatestCard(null);
  };

  return (
    <motion.div className="space-y-6 w-full border border-slate-300 border-dashed p-4 rounded">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <RHFInput
            form={form}
            name="question"
            label="Question"
            placeholder="What is your question"
          />
          <AnimatePresence>
            {latestCard && (
              <motion.div
                hidden={!latestCard}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="flex flex-col space-y-2 mt-3"
              >
                <Label>Answer</Label>
                <p>{latestCard?.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={cn(
              "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-5"
            )}
          >
            {latestCard && (
              <Button onClick={handleSkip} variant="outline">
                Skip
              </Button>
            )}
            <Button
              type={latestCard ? "button" : "submit"}
              onClick={latestCard ? handleAddToCollection : () => {}}
              isLoading={form.formState.isSubmitting}
            >
              {latestCard ? "Add to collection" : "Ask question"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
