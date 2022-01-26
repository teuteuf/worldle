import { useCallback, useState } from "react";
import { Guess } from "../domain/guess";

function loadAllGuesses(): Record<string, Guess[]> {
  const storedGuesses = localStorage.getItem("guesses");
  return storedGuesses != null ? JSON.parse(storedGuesses) : {};
}

export function useGuesses(
  dayString: string
): [Guess[], (guess: Guess) => void] {
  const [guesses, setGuesses] = useState<Guess[]>(
    loadAllGuesses()[dayString] ?? []
  );

  const saveGuesses = useCallback(
    (guesses: Guess[]) => {
      const allGuesses = loadAllGuesses();
      localStorage.setItem(
        "guesses",
        JSON.stringify({
          ...allGuesses,
          [dayString]: guesses,
        })
      );
    },
    [dayString]
  );

  const addGuess = useCallback(
    (newGuess: Guess) => {
      const newGuesses = [...guesses, newGuess];

      setGuesses(newGuesses);
      saveGuesses(newGuesses);
    },
    [guesses, saveGuesses]
  );

  return [guesses, addGuess];
}
