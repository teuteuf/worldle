import React from "react";
import { Guess } from "../domain/guess";

interface HintsProps {
  guesses: Guess[];
}

const questions = [
  "question 1",
  "question 2",
  "question 3",
  "question 4",
  "question 5",
  "question 6",
];

export function Hints({ guesses }: HintsProps) {
  const numberOfGuesses = guesses.length;

  const hintQuestions = questions.map((question, idx) => {
    return (
      <div key={idx} className="pb-3">
        {question}
      </div>
    );
  });

  return <>{hintQuestions.slice(0, numberOfGuesses)}</>;
}
