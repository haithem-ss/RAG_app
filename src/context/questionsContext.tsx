"use client";

import React, { useEffect, useState } from "react";
import Spinner from "../components/sections/spinner";

export interface Card {
  question: string | null;
  answer: string | null;
}

interface QuestionsContextValue {
  collectionName: string | null | undefined;
  cards: Card[];
  addCard: (newCard: Card) => void;
  deleteCard: (index: number) => void;
  updateCard: (index: number, updatedCard: Card) => void;
  updateCollectionName: (newCollectionName: string) => void;
}

export const QuestionsContext = React.createContext<QuestionsContextValue>({
  collectionName: undefined,
  cards: [],
  addCard: () => {},
  deleteCard: () => {},
  updateCard: () => {},
  updateCollectionName: () => {},
});

export const useQuestions = () => React.useContext(QuestionsContext);

const QuestionsProvider = ({ children }: { children: any }) => {
  const [collectionName, setCollectionName] = useState<
    string | undefined | null
  >(undefined);

  useEffect(() => {
    console.log(
      "Setting collection name",
      localStorage?.getItem("collectionName")
    );
    setCollectionName(localStorage?.getItem("collectionName"));
  }, []);

  const [cards, setCards] = useState<Array<Card>>(() => {
    const storedCards =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("cards")
        : null;
    return storedCards ? JSON.parse(storedCards) : [];
  });

  useEffect(() => {
    // Load cards from local storage on component mount
    const storedCards =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("cards")
        : null;
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  useEffect(() => {
    // Save cards to local storage whenever it changes
    localStorage?.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = (newCard: Card) => {
    setCards((cards) => [...cards, newCard]);
  };

  const deleteCard = (index: number) => {
    if (index < 0 || index >= cards.length) {
      throw new Error("Invalid index");
    }
    setCards((cards) => {
      const updatedCards = cards.filter((_, idx) => idx !== index);
      return updatedCards;
    });
  };

  const updateCollectionName = (newCollectionName: string) => {
    setCollectionName(newCollectionName);
    localStorage?.setItem("collectionName", newCollectionName);
  };

  const updateCard = (index: number | null, updatedCard: Card) => {
    if (index === null) throw new Error("Index is required to update card");
    setCards((cards) => {
      const updatedCards = cards.map((c, i) => {
        if (i === index) {
          return { ...c, ...updatedCard };
        }
        return c;
      });
      return updatedCards;
    });
  };

  const contextValue: QuestionsContextValue = {
    collectionName,
    updateCollectionName,
    cards: cards,
    addCard: addCard,
    deleteCard: deleteCard,
    updateCard: updateCard,
  };

  return (
    <QuestionsContext.Provider value={contextValue}>
      {collectionName === undefined ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
