import { t } from "i18next";
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useTranslation } from "react-i18next";
import {
  countries,
  getCountryName,
  sanitizeCountryName,
} from "../domain/countries";

interface CountryInputProps {
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
}

export function CountryInput({
  currentGuess,
  setCurrentGuess,
}: CountryInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { i18n } = useTranslation();

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(
          countries
            .map((c) => getCountryName(i18n.resolvedLanguage, c).toUpperCase())
            .filter((countryName) =>
              sanitizeCountryName(countryName).includes(
                sanitizeCountryName(value)
              )
            )
        )
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => (
        <div className="border-2">{suggestion}</div>
      )}
      containerProps={{
        className: "border-2 flex-auto relative",
      }}
      inputProps={{
        className: "w-full",
        placeholder: t("placeholder"),
        value: currentGuess,
        onChange: (_e, { newValue }) => setCurrentGuess(newValue),
      }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          {...containerProps}
          className={`${containerProps.className} absolute bottom-full w-full bg-white mb-1 divide-x-2 max-h-52 overflow-auto`}
        >
          {children}
        </div>
      )}
    />
  );
}
