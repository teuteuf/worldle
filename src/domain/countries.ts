// Source:
// Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
// Countries images => https://github.com/djaiss/mapsicon
// Country area => https://github.com/samayo/country-json/blob/master/src/country-by-surface-area.json

import { areas } from "./countries.area";
import { countries } from "./countries.position";
import { corsicanCountryNames } from "./countries.name.co";
import { frenchCountryNames } from "./countries.name.fr";
import { hungarianCountryNames } from "./countries.name.hu";
import { dutchCountryNames } from "./countries.name.nl";
import { polishCountryNames } from "./countries.name.pl";
import { germanCountryNames } from "./countries.name.de";
import { countryCodesWithImage } from "./countries.image";
import { japaneseCountryNames } from "./countries.name.ja";

export interface Country {
  code: string;
  latitude: number;
  longitude: number;
  name: string;
}

export const countriesWithImage = countries.filter((c) =>
  countryCodesWithImage.includes(c.code.toLowerCase())
);

export const smallCountryLimit = 5000;
export const bigEnoughCountriesWithImage = countriesWithImage.filter(
  (country) => areas[country.code] > smallCountryLimit
);

export function getCountryName(language: string, country: Country) {
  switch (language) {
    case "co":
      return corsicanCountryNames[country.code];
    case "fr":
      return frenchCountryNames[country.code];
    case "hu":
      return hungarianCountryNames[country.code];
    case "nl":
      return dutchCountryNames[country.code];
    case "pl":
      return polishCountryNames[country.code];
    case "de":
      return germanCountryNames[country.code];
    case "ja":
      return japaneseCountryNames[country.code];
    default:
      return country.name;
  }
}

const frenchCountryCodes = mapFlip(frenchCountryNames);
const hungarianCountryCodes = mapFlip(hungarianCountryNames);
const dutchCountryCodes = mapFlip(dutchCountryNames);
const polishCountryCodes = mapFlip(polishCountryNames);
const englishCountryCodes = countries.reduce((acc, country: Country) => {
  acc[country.name.toUpperCase()] = country.code;
  return acc as Record<string, string>;
}, {} as Record<string, string>);

export function getCountryCode(language: string, countryName: string) {
  switch (language) {
    case "fr":
      return frenchCountryCodes[countryName];
    case "hu":
      return hungarianCountryCodes[countryName];
    case "nl":
      return dutchCountryCodes[countryName];
    case "pl":
      return polishCountryCodes[countryName];
    default:
      return englishCountryCodes[countryName];
  }
}

export function sanitizeCountryName(countryName: string): string {
  return countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[- '()]/g, "")
    .toLowerCase();
}

function mapFlip(map: Record<string, string>): Record<string, string> {
  const entries = Object.entries(map);

  const output: Record<string, string> = {};
  for (const [toVal, toKey] of entries) {
    output[toKey] = toVal;
  }

  return output;
}
