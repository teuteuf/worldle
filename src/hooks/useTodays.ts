import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import seedrandom from "seedrandom";
import {
  bigEnoughCountriesWithImage,
  countriesWithImage,
  Country,
  smallCountryLimit,
} from "../domain/countries";
import { areas } from "../domain/countries.area";
import { Guess, loadAllGuesses, saveGuesses } from "../domain/guess";

const forcedCountries: Record<string, string> = {
};


export function getDayString(shiftDayCount?: number) {
  return DateTime.now()
    .plus({ days: shiftDayCount ?? 0 })
    .toFormat("yyyy-MM-dd");
}

export function useTodays(dayString: string): [
  {
    country?: Country;
    guesses: Guess[];
  },
  (guess: Guess) => void,
  number,
  number
] {
  const [todays, setTodays] = useState<{
    country?: Country;
    guesses: Guess[];
  }>({ guesses: [] });

  const addGuess = useCallback(
    (newGuess: Guess) => {
      if (todays == null) {
        return;
      }

      const newGuesses = [...todays.guesses, newGuess];

      setTodays((prev) => ({ country: prev.country, guesses: newGuesses }));
      saveGuesses(dayString, newGuesses);
    },
    [dayString, todays]
  );

  useEffect(() => {
    const guesses = loadAllGuesses()[dayString] ?? [];
    const country = getCountry(dayString);

    setTodays({ country, guesses });
  }, [dayString]);

  const randomAngle = useMemo(
    () => seedrandom.alea(dayString)() * 360,
    [dayString]
  );

  const imageScale = useMemo(() => {
    const normalizedAngle = 45 - (randomAngle % 90);
    const radianAngle = (normalizedAngle * Math.PI) / 180;
    return 1 / (Math.cos(radianAngle) * Math.sqrt(2));
  }, [randomAngle]);

  return [todays, addGuess, randomAngle, imageScale];
}

function getCountry(dayString: string) {
  const currentDayDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
  let pickingDate = DateTime.fromFormat("2022-03-21", "yyyy-MM-dd");
  let pickedCountry: Country | null = null;

  const lastPickDates: Record<string, DateTime> = {};

  do {

    const pickingDateString = pickingDate.toFormat("yyyy-MM-dd");

    const forcedCountryCode = forcedCountries[dayString];
    const forcedCountry =
      forcedCountryCode != null
        ? countriesWithImage.find(
            (country) => country.code === forcedCountryCode
          )
        : undefined;

    const countrySelection = countriesWithImage;

    if (forcedCountry != null) {
      pickedCountry = forcedCountry;
    } else {
      let countryIndex = Math.floor(
        seedrandom.alea(pickingDateString)() * countrySelection.length
      );
      pickedCountry = countrySelection[countryIndex];     
    }

    lastPickDates[pickedCountry.code] = pickingDate;
    pickingDate = pickingDate.plus({ day: 1 });
  } while (pickingDate <= currentDayDate);

  return pickedCountry;
}