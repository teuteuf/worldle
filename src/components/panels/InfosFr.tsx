import { Guesses } from "../Guesses";
import { Panel } from "./Panel";
import React from "react";

interface InfosProps {
  isOpen: boolean;
  close: () => void;
}

export function InfosFr({ isOpen, close }: InfosProps) {
  return (
    <Panel isOpen={isOpen} close={close}>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div>
          {" "}
          Devine le{" "}
          <span className="font-bold">
            WOR<span className="text-green-600">L</span>DLE
          </span>{" "}
          en 6 essais.
        </div>
        <div>Chaque essai doit être un pays, un territoire, etc... valide.</div>
        <div>
          Après chaque essai, vous aurez la distance, la direction et la
          proximité entre votre essai et le pays cible.
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div className="font-bold">Exemples</div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Chili",
                direction: "NE",
                distance: 13_557_000,
              },
            ]}
          />
          <div className="my-2">
            Votre essai <span className="uppercase font-bold">Chili</span> est à
            13557km du pays cible, le pays cible se trouve dans la direction
            Nord-Est et vous avez une proximité de seulement 32% car votre essai
            est plutôt éloigné !
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Finlande",
                direction: "SE",
                distance: 3_206_000,
              },
            ]}
          />
          <div className="my-2">
            Votre seconde essai{" "}
            <span className="uppercase font-bold">Finlande</span> est plus
            proche ! La bonne réponse est à 3206km, au Sud-Est et la proximité
            est de 84%!
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Liban",
                direction: "N",
                distance: 0,
              },
            ]}
          />
          <div className="my-2">
            Prochain essai, <span className="uppercase font-bold">Liban</span>,
            c&apos;est le pays à deviner ! Bien joué ! 🎉
          </div>
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3 font-bold">
        Un nouveau WOR<span className="text-green-600">L</span>DLE sera
        disponible chaque jour !
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <span className="font-bold">
          WOR<span className="text-green-600">L</span>DLE
        </span>{" "}
        a été <span className="font-bold">très</span> inpsiré par{" "}
        <a
          className="underline"
          href="https://www.powerlanguage.co.uk/wordle/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wordle
        </a>{" "}
        créé par{" "}
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
          Fait par{" "}
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
          Vous voulez me soutenir ?{" "}
          <a
            className="underline"
            href="https://www.buymeacoffee.com/teuteuf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Offrez moi un café ! ☕
          </a>
        </div>
      </div>
    </Panel>
  );
}
