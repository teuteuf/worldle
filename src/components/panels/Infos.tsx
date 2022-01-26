import { Guesses } from "../Guesses";
import { Panel } from "./Panel";
import React from "react";

interface InfosProps {
  isOpen: boolean;
  close: () => void;
}

export function Infos({ isOpen, close }: InfosProps) {
  return (
    <Panel isOpen={isOpen} close={close}>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div>
          Guess the{" "}
          <span className="font-bold">
            WOR<span className="text-green-600">L</span>DLE
          </span>{" "}
          in 6 guesses.
        </div>
        <div>Each guess must be a valid country, territory, ...</div>
        <div>
          After each guess, you will have the distance, the direction and the
          proximity from your guess and the target country.
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div className="font-bold">Examples</div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Chile",
                direction: "NE",
                distance: 13_557_000,
              },
            ]}
          />
          <div className="my-2">
            Your guess <span className="uppercase font-bold">Chile</span> is
            13557km away from the target country, the target country is in the
            North-East direction and you have a only 32% of proximity because
            it&apos;s quite far away!
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Finland",
                direction: "SE",
                distance: 3_206_000,
              },
            ]}
          />
          <div className="my-2">
            Your second guess{" "}
            <span className="uppercase font-bold">Finland</span> is getting
            closer! 3206km away, South-East direction and 84%!
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Lebanon",
                direction: "N",
                distance: 0,
              },
            ]}
          />
          <div className="my-2">
            Next guess, <span className="uppercase font-bold">Lebanon</span>,
            it&apos;s the country to guess! Congrats! 🎉
          </div>
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3 font-bold">
        A new WOR<span className="text-green-600">L</span>DLE will be available
        every day!
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <span className="font-bold">
          WOR<span className="text-green-600">L</span>DLE
        </span>{" "}
        has been <span className="font-bold">heavily</span> inspired by{" "}
        <a
          className="underline"
          href="https://www.powerlanguage.co.uk/wordle/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wordle
        </a>{" "}
        created by{" "}
        <a
          className="underline"
          href="https://twitter.com/powerlanguish"
          target="_blank"
          rel="noopener noreferrer"
        >
          Josh Wardle (@powerlanguish)
        </a>
        .
      </div>
      <div className="space-y-3 text-justify pb-3">
        <div>
          Made by{" "}
          <a
            className="underline"
            href="https://twitter.com/teuteuf"
            target="_blank"
            rel="noopener noreferrer"
          >
            @teuteuf
          </a>
        </div>
        <div>
          Want to support?{" "}
          <a
            className="underline"
            href="https://www.buymeacoffee.com/teuteuf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy me a coffee! ☕
          </a>
        </div>
      </div>
    </Panel>
  );
}
