// Source:
// Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
// Countries images => https://github.com/djaiss/mapsicon
// Country area => https://github.com/samayo/country-json/blob/master/src/country-by-surface-area.json

import { areas } from "./countries.area";
import { countries } from "./countries.position";
import { frenchCountryNames } from "./countries.name.fr";
import { dutchCountryNames } from "./countries.name.nl";
import { countryCodesWithImage } from "./countries.image";

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
  if (language === "fr") {
    return frenchCountryNames[country.code];
  }
  if (language === "nl") {
    return dutchCountryNames[country.code];
  }
  return country.name;
}

export function sanitizeCountryName(countryName: string): string {
  return countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[- '()]/g, "")
    .toLowerCase();
}
