import { DateTime } from "luxon";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import seedrandom from "seedrandom";
import {
  countries,
  countriesWithImage,
  getCountryName,
  sanitizeCountryName,
} from "../domain/countries";
import { useGuesses } from "../hooks/useGuesses";
import { CountryInput } from "./CountryInput";
import * as geolib from "geolib";
import { Share } from "./Share";
import { Guesses } from "./Guesses";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../hooks/useSettings";
import { useHideImageMode } from "../hooks/useHideImageMode";

function getDayString() {
  return DateTime.now().toFormat("yyyy-MM-dd");
}

const MAX_TRY_COUNT = 6;

interface GameProps {
  settingsData: SettingsData;
}

export function Game({ settingsData }: GameProps) {
  const { t, i18n } = useTranslation();
  const dayString = useMemo(getDayString, []);
  const country = useMemo(
    () =>
      countriesWithImage[
        Math.floor(seedrandom.alea(dayString)() * countriesWithImage.length)
      ],
    [dayString]
  );

  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, addGuess] = useGuesses(dayString);
  const [hideImageMode, setHideImageMode] = useHideImageMode(
    dayString,
    settingsData.noImageMode
  );

  const gameEnded =
    guesses.length === MAX_TRY_COUNT ||
    guesses[guesses.length - 1]?.distance === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const guessedCountry = countries.find(
        (country) =>
          sanitizeCountryName(
            getCountryName(i18n.resolvedLanguage, country)
          ) === sanitizeCountryName(currentGuess)
      );

      if (guessedCountry == null) {
        toast.error(t("unknownCountry"));
        return;
      }

      const newGuess = {
        name: currentGuess,
        distance: geolib.getDistance(guessedCountry, country),
        direction: geolib.getCompassDirection(guessedCountry, country),
      };

      addGuess(newGuess);
      setCurrentGuess("");

      if (newGuess.distance === 0) {
        toast.success(t("welldone"));
      }
    },
    [addGuess, country, currentGuess, i18n.resolvedLanguage, t]
  );

  useEffect(() => {
    if (
      guesses.length === MAX_TRY_COUNT &&
      guesses[guesses.length - 1].distance > 0
    ) {
      toast.info(getCountryName(i18n.resolvedLanguage, country).toUpperCase(), {
        autoClose: false,
      });
    }
  }, [country, guesses, i18n.resolvedLanguage]);

  return (
    <div className="flex flex-col mx-2">
      {hideImageMode ? (
        <button
          className="border-2 uppercase my-2 hover:bg-gray-50 active:bg-gray-100"
          type="button"
          onClick={() => setHideImageMode(false)}
        >
          {t("showCountry")}
        </button>
      ) : (
        <img
          className="max-h-52 my-1"
          alt="country to guess"
          src={`images/countries/${country.code.toLowerCase()}/vector.svg`}
        />
      )}
      <Guesses rowCount={MAX_TRY_COUNT} guesses={guesses} />
      <div className="my-2">
        {gameEnded ? (
          <Share
            guesses={guesses}
            dayString={dayString}
            hideImageMode={hideImageMode}
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <CountryInput
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
              />
              <button
                className="border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100"
                type="submit"
              >
                🌍 {t("guess")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
