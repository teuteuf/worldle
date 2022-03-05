import {
  computeProximityPercent,
  formatDistance,
  generateSquareCharacters,
} from "../domain/geography";
import { Guess } from "../domain/guess";
import React, { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import { SettingsData } from "../hooks/useSettings";
import { Twemoji } from "@teuteuf/react-emoji-render";

const SQUARE_ANIMATION_LENGTH = 250;
type AnimationState = "NOT_STARTED" | "RUNNING" | "ENDED";

interface GuessRowProps {
  guess?: Guess;
  settingsData: SettingsData;
  countryInputRef?: React.RefObject<HTMLInputElement>;
}

export function GuessRow({
  guess,
  settingsData,
  countryInputRef,
}: GuessRowProps) {
  const { distanceUnit, theme } = settingsData;
  const proximity = guess != null ? computeProximityPercent(guess.distance) : 0;
  const squares = generateSquareCharacters(proximity, theme);

  const [animationState, setAnimationState] =
    useState<AnimationState>("NOT_STARTED");

  useEffect(() => {
    if (guess == null) {
      return;
    }

    setAnimationState("RUNNING");
    const timeout = setTimeout(() => {
      setAnimationState("ENDED");
    }, SQUARE_ANIMATION_LENGTH * 6);

    return () => {
      clearTimeout(timeout);
    };
  }, [guess]);

  const handleClickOnEmptyRow = useCallback(() => {
    if (countryInputRef?.current != null) {
      countryInputRef?.current.focus();
    }
  }, [countryInputRef]);

  switch (animationState) {
    case "NOT_STARTED":
      return (
        <div
          onClick={handleClickOnEmptyRow}
          className={`col-span-7 h-8 bg-gray-200 dark:bg-slate-600`}
        />
      );
    case "RUNNING":
      return (
        <>
          <div
            className={`flex text-2xl w-full justify-evenly items-center col-span-6 border-2 h-8`}
          >
            {squares.map((character, index) => (
              <div
                key={index}
                className="opacity-0 animate-reveal"
                style={{
                  animationDelay: `${SQUARE_ANIMATION_LENGTH * index}ms`,
                }}
              >
                <Twemoji text={character} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center border-2 h-8 col-span-1 animate-reveal">
            <CountUp
              end={proximity}
              suffix="%"
              duration={(SQUARE_ANIMATION_LENGTH * 5) / 1000}
            />
          </div>
        </>
      );
    case "ENDED":
      return (
        <>
          <div className="flex items-center justify-center border-2 h-8 col-span-3 animate-reveal">
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {guess?.name.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center justify-center border-2 h-8 col-span-2 animate-reveal">
            {guess && formatDistance(guess.distance, distanceUnit)}
          </div>
          <div className="flex items-center justify-center border-2 h-8 col-span-1 animate-reveal">
            {guess && (
              <span
                style={{
                  transform: `rotate(${guess.preciseDirection - 90}deg)`,
                }}
              >
                ➜
              </span>
            )}
          </div>
          <div className="flex items-center justify-center border-2 h-8 col-span-1 animate-reveal animate-pop">
            {`${proximity}%`}
          </div>
        </>
      );
  }
}
