import { DateTime, Interval } from "luxon";
import { useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { computeProximityPercent } from "../domain/geography";
import { Guess } from "../domain/guess";
import React from "react";

const START_DATE = DateTime.fromISO("2022-01-21");

interface ShareProps {
  guesses: Guess[];
  dayString: string;
  hideImageMode: boolean;
}

export function Share({ guesses, dayString, hideImageMode }: ShareProps) {
  const { t } = useTranslation();

  const shareText = useMemo(() => {
    const guessCount =
      guesses[guesses.length - 1]?.distance === 0 ? guesses.length : "X";
    const dayCount = Math.floor(
      Interval.fromDateTimes(START_DATE, DateTime.fromISO(dayString)).length(
        "day"
      )
    );
    const hiddenModeEmoji = hideImageMode ? " 🙈" : "";
    const title = `Worldle #${dayCount} ${guessCount}/6${hiddenModeEmoji}`;

    const guessString = guesses
      .map((guess) => {
        const percent = computeProximityPercent(guess.distance);
        const greenSquareCount = Math.floor(percent / 20);
        const yellowSquareCount = percent - greenSquareCount * 20 >= 10 ? 1 : 0;
        const green = "🟩".repeat(greenSquareCount);
        const yellow = "🟨".repeat(yellowSquareCount);
        const white = "⬜".repeat(5 - greenSquareCount - yellowSquareCount);
        return `${green}${yellow}${white}`;
      })
      .join("\n");

    return [title, guessString, "https://worldle.teuteuf.fr"].join("\n");
  }, [dayString, guesses, hideImageMode]);

  return (
    <CopyToClipboard
      text={shareText}
      onCopy={() => toast(t("copy"))}
      options={{
        format: "text/plain",
      }}
    >
      <button className="border-2 px-4 uppercase bg-green-600 hover:bg-green-500 active:bg-green-700 text-white w-full">
        {t("share")}
      </button>
    </CopyToClipboard>
  );
}
