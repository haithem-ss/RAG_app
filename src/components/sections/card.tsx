import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card as CardType, useQuestions } from "../../context/questionsContext";
import { Check, Delete, Edit2Icon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export function FlashCard({
  card,
  editable = false,
  index = null,
}: {
  card: CardType;
  editable?: boolean;
  index?: number | null;
}) {
  if (index === null && editable)
    throw new Error("Index is required to update card");

  const { updateCard, deleteCard } = useQuestions();
  const [canEdit, setCanEdit] = useState(false);
  const [cardData, setCardData] = useState({
    question: card.question,
    answer: card.answer,
  });

  const questionRef = React.useRef<HTMLDivElement>(null);
  const answerRef = React.useRef<HTMLDivElement>(null);

  const handleToggleEdit = () => {
    setCanEdit(!canEdit);
    if (canEdit) {
      const newCardData = {
        question: questionRef.current?.innerText || "",
        answer: answerRef.current?.innerText || "",
      };
      setCardData(newCardData);
      updateCard(index!, newCardData);
    }
  };

  const handleDelete = () => {
    deleteCard(index!);
  };

  return (
    <Card className="min-h-[200px] flex flex-col justify-between">
      <CardHeader className="min-h-[200px] select-none space-y-3">
        <CardTitle
          contentEditable={canEdit}
          id="question"
          ref={questionRef}
        >
          {cardData.question}
        </CardTitle>
        <CardDescription
          contentEditable={canEdit}
          ref={answerRef}
          id="answer"
        >
          {cardData.answer}
        </CardDescription>
      </CardHeader>
      {editable && (
        <CardFooter className="flex justify-end">
          <Button variant="ghost">
            <Delete className="size-5" onClick={handleDelete} />
          </Button>
          <Button variant="ghost" onClick={handleToggleEdit}>
            {!canEdit ? (
              <Edit2Icon className="size-5" />
            ) : (
              <Check className="size-5" />
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export function TestFlashCard({ card }: { card: CardType }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <Card>
      <CardHeader className="min-h-[200px] select-none space-y-3">
        <CardTitle>{card.question}</CardTitle>
        <CardDescription
          className={cn(!showAnswer ? "blur-sm" : "blur-none")}
          onClick={() => setShowAnswer(true)}
        >
          {card.answer}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
