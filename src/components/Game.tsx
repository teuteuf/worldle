import React, {
  ReactText,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  getCountryCode,
  getCountryName,
  sanitizeCountryName,
} from "../domain/countries";
import { CountryInput } from "./CountryInput";
import * as geolib from "geolib";
import { Share } from "./Share";
import { Guesses } from "./Guesses";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../hooks/useSettings";
import { useMode } from "../hooks/useMode";
import { getDayString, useTodays } from "../hooks/useTodays";
import { Twemoji } from "@teuteuf/react-emoji-render";
import { countries } from "../domain/countries.position";
import { useNewsNotifications } from "../hooks/useNewsNotifications";

const ENABLE_TWITCH_LINK = false;
const MAX_TRY_COUNT = 6;

interface GameProps {
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
}

export type MouseOverFunction = (event: any) => void;
export type MouseOutFunction = (event: any) => void;

export function Game({ settingsData, updateSettings }: GameProps) {
  const { t, i18n } = useTranslation();
  const dayString = useMemo(
    () => getDayString(settingsData.shiftDayCount),
    [settingsData.shiftDayCount]
  );

  useNewsNotifications(dayString);

  const countryInputRef = useRef<HTMLInputElement>(null);

  const [todays, addGuess, randomAngle, imageScale] = useTodays(dayString);
  const { country, guesses } = todays;
  const countryName = useMemo(
    () => (country ? getCountryName(i18n.resolvedLanguage, country) : ""),
    [country, i18n.resolvedLanguage]
  );

  const [currentGuess, setCurrentGuess] = useState("");
  const [hideImageMode, setHideImageMode] = useMode(
    "hideImageMode",
    dayString,
    settingsData.noImageMode
  );
  const [rotationMode, setRotationMode] = useMode(
    "rotationMode",
    dayString,
    settingsData.rotationMode
  );

  const gameEnded =
    guesses.length === MAX_TRY_COUNT ||
    guesses[guesses.length - 1]?.distance === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (country == null) {
        return;
      }
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
        direction: geolib.getCompassDirection(
          guessedCountry,
          country,
          (origin, dest) =>
            Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45
        ),
      };

      addGuess(newGuess);
      setCurrentGuess("");

      if (newGuess.distance === 0) {
        toast.success(t("welldone"), { delay: 2000 });
      }
    },
    [addGuess, country, currentGuess, i18n.resolvedLanguage, t]
  );

  useEffect(() => {
    let toastId: ReactText;
    const { country, guesses } = todays;
    if (
      country &&
      guesses.length === MAX_TRY_COUNT &&
      guesses[guesses.length - 1].distance > 0
    ) {
      toastId = toast.info(
        getCountryName(i18n.resolvedLanguage, country).toUpperCase(),
        {
          autoClose: false,
          delay: 2000,
        }
      );
    }

    return () => {
      if (toastId != null) {
        toast.dismiss(toastId);
      }
    };
  }, [todays, i18n.resolvedLanguage]);

  const [hoverCountry, setHoverCountry] = useState("");

  const activateComparison: MouseOverFunction = (event: Event) => {
    const countryName = (event.target as HTMLElement).innerText;
    setHoverCountry(countryName);
  };

  const deactivateComparison: MouseOutFunction = (event: Event) => {
    setHoverCountry("");
  };

  return (
    <div className="flex-grow flex flex-col mx-2">
      {hideImageMode && !gameEnded && (
        <button
          className="font-bold border-2 p-1 rounded uppercase my-2 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          type="button"
          onClick={() => setHideImageMode(false)}
        >
          <Twemoji
            text={t("showCountry")}
            options={{ className: "inline-block" }}
          />
        </button>
      )}
      <div className="flex my-1" style={{ position: "relative" }}>
        {settingsData.allowShiftingDay && settingsData.shiftDayCount > 0 && (
          <button
            type="button"
            onClick={() =>
              updateSettings({
                shiftDayCount: Math.max(0, settingsData.shiftDayCount - 1),
              })
            }
          >
            <Twemoji text="↪️" className="text-xl" />
          </button>
        )}
        <div className="flex flex-grow" style={{ position: "relative" }}>
          <div
            className="pointer-events-none max-h-52 m-auto transition-transform duration-700 ease-in"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {gameEnded &&
              guesses.map((guess) => (
                <div
                  key={guess.name}
                  style={{
                    position: "absolute",
                    top: 0,
                    opacity: hoverCountry === guess.name ? 0.5 : 0,
                  }}
                >
                  <img
                    className={`pointer-events-none max-h-52 m-auto transition-transform duration-700 ease-in dark:invert ${
                      hideImageMode && !gameEnded ? "h-0" : "h-full"
                    }`}
                    alt="country to guess"
                    src={`images/countries/${getCountryCode(
                      i18n.language,
                      guess.name
                    )}/vector.svg`}
                    style={
                      rotationMode && !gameEnded
                        ? {
                            transform: `rotate(${randomAngle}deg) scale(${imageScale})`,
                          }
                        : {}
                    }
                  />
                </div>
              ))}
          </div>
          <img
            className={`pointer-events-none max-h-52 m-auto transition-transform duration-700 ease-in dark:invert ${
              hideImageMode && !gameEnded ? "h-0" : "h-full"
            }`}
            alt="country to guess"
            src={`images/countries/${country?.code.toLowerCase()}/vector.svg`}
            style={
              rotationMode && !gameEnded
                ? {
                    transform: `rotate(${randomAngle}deg) scale(${imageScale})`,
                  }
                : {}
            }
          />
        </div>
        {settingsData.allowShiftingDay && settingsData.shiftDayCount < 7 && (
          <button
            type="button"
            onClick={() =>
              updateSettings({
                shiftDayCount: Math.min(7, settingsData.shiftDayCount + 1),
              })
            }
          >
            <Twemoji text="↩️" className="text-xl" />
          </button>
        )}
      </div>
      {rotationMode && !hideImageMode && !gameEnded && (
        <button
          className="font-bold rounded p-1 border-2 uppercase mb-2 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          type="button"
          onClick={() => setRotationMode(false)}
        >
          <Twemoji
            text={t("cancelRotation")}
            options={{ className: "inline-block" }}
          />
        </button>
      )}
      <Guesses
        targetCountry={country}
        rowCount={MAX_TRY_COUNT}
        guesses={guesses}
        settingsData={settingsData}
        countryInputRef={countryInputRef}
        onMouseOver={activateComparison}
        onMouseOut={deactivateComparison}
      />
      <div className="my-2">
        {gameEnded && country ? (
          <>
            <Share
              guesses={guesses}
              dayString={dayString}
              settingsData={settingsData}
              hideImageMode={hideImageMode}
              rotationMode={rotationMode}
            />
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                className="underline text-center block mt-4 whitespace-nowrap"
                href={`https://www.google.com/maps?q=${countryName}+${country.code.toUpperCase()}&hl=${
                  i18n.resolvedLanguage
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twemoji
                  text={t("showOnGoogleMaps")}
                  options={{ className: "inline-block" }}
                />
              </a>
              <a
                className="underline text-center block mt-4 whitespace-nowrap"
                href={`https://${i18n.resolvedLanguage}.wikipedia.org/wiki/${countryName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twemoji
                  text={t("showOnWikipedia")}
                  options={{ className: "inline-block" }}
                />
              </a>
            </div>
            {ENABLE_TWITCH_LINK && (
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  className="underline text-center block mt-4 whitespace-nowrap"
                  href="https://www.twitch.tv/t3uteuf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twemoji
                    text="More? Play on Twitch! 👾"
                    options={{ className: "inline-block" }}
                  />
                </a>
              </div>
            )}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                className="underline text-center block mt-4 whitespace-nowrap"
                href="https://emovi.teuteuf.fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twemoji
                  text={
                    dayString === "2022-07-17"
                      ? "Let's celebrate #WorldEmojiDay! Play Emovi! 🎥"
                      : "Try my new game, play Emovi! 🎥"
                  }
                  options={{ className: "inline-block" }}
                />
              </a>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <CountryInput
                inputRef={countryInputRef}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
              />
              <button
                className="rounded font-bold p-1 flex items-center justify-center border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
                type="submit"
              >
                <Twemoji
                  text="🌍"
                  options={{ className: "inline-block" }}
                  className="flex items-center justify-center"
                />{" "}
                <span className="ml-1">{t("guess")}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
