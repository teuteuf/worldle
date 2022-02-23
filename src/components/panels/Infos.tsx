import { Guesses } from "../Guesses";
import { Panel } from "./Panel";
import React from "react";
import { Worldle } from "../Worldle";
import { formatDistance } from "../../domain/geography";
import { SettingsData } from "../../hooks/useSettings";

interface InfosProps {
  isOpen: boolean;
  close: () => void;
  settingsData: SettingsData;
}

export function Infos({ isOpen, close, settingsData }: InfosProps) {
  return (
    <Panel title="Como Jogar" isOpen={isOpen} close={close}>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div>
          Descubra em que parte do <Worldle /> nós estamos em 6 tentativas.
        </div>
        <div>Cada tentativa precisa ser um país válido...</div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div className="font-bold">Exemplos</div>
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
            settingsData={settingsData}
          />
          <div className="my-2">
            O <span className="uppercase font-bold">Chile</span> está{" "}
            {formatDistance(13557000, settingsData.distanceUnit)} de distância.
            A resposta correta está mais ao Noroeste.
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Finlândia",
                direction: "SE",
                distance: 3_206_000,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            Sua segunda tentativa{" "}
            <span className="uppercase font-bold">Finlândia</span> está mais
            perto! {formatDistance(3206000, settingsData.distanceUnit)} de
            distância! a resposta correta está mais ao Sudoeste.
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Líbano",
                direction: "N",
                distance: 0,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            O <span className="uppercase font-bold">Líbano </span>
            está correto! Parabéns! 🎉
          </div>
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3 font-bold">
        Volte amanhã para um novo país!
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <Worldle /> foi <span className="font-bold">inpirado</span> por{" "}
        <a
          className="underline"
          href="https://www.powerlanguage.co.uk/wordle/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wordle
        </a>{" "}
      </div>
      <div className="space-y-3 text-justify pb-3">
        <div>
          Feito por{" "}
          <a
            className="underline"
            href="https://twitter.com/teuteuf"
            target="_blank"
            rel="noopener noreferrer"
          >
            @teuteuf{" "}
          </a>
          e traduzido por{" "}
          <a
            className="underline"
            href="https://twitter.com/eraizel"
            target="_blank"
            rel="noopener noreferrer"
          >
            @eraizel{" "}
          </a>
        </div>
        <div>
          Gostou do jogo?{" "}
          <a
            className="underline"
            href="https://ko-fi.com/eraizel"
            target="_blank"
            rel="noopener noreferrer"
          >
            compre um cafezinho para mim! ☕
          </a>
        </div>
      </div>
    </Panel>
  );
}
