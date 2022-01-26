import { computeProximityPercent, Direction } from "../domain/geography";
import { Guess } from "../domain/guess";
import React from "react";

const DIRECTION_ARROWS: Record<Direction, string> = {
  N: "⬆️",
  NNE: "↗️",
  NE: "↗️",
  ENE: "↗️",
  E: "➡️",
  ESE: "↘️",
  SE: "↘️",
  SSE: "↘️",
  S: "⬇️",
  SSW: "↙️",
  SW: "↙️",
  WSW: "↙️",
  W: "⬅️",
  WNW: "↖️",
  NW: "↖️",
  NNW: "↖️",
};

export function GuessRow({ guess }: { guess?: Guess }) {
  const bgColor = guess != null ? "bg-white" : "bg-gray-200";

  return (
    <>
      <div
        className={`text-ellipsis overflow-hidden whitespace-nowrap border-2 h-8 col-span-3 ${bgColor}`}
      >
        {guess?.name.toUpperCase()}
      </div>
      <div className={`border-2 h-8 col-span-2 ${bgColor}`}>
        {guess && `${Math.round(guess.distance / 1000)}km`}
      </div>
      <div className={`border-2 h-8 col-span-1 ${bgColor}`}>
        {guess?.distance === 0
          ? "🎉"
          : guess && DIRECTION_ARROWS[guess.direction]}
      </div>
      <div className={`border-2 h-8 col-span-1 ${bgColor}`}>
        {guess && `${computeProximityPercent(guess.distance)}%`}
      </div>
    </>
  );
}
