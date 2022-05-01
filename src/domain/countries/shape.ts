// Source:
// Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
// Countries images => https://github.com/djaiss/mapsicon
// Country area => https://github.com/samayo/country-json/blob/master/src/country-by-surface-area.json

import { areas } from "./area";
import { countries } from "./position";
import { frenchCountryNames } from "./name.fr";
import { hungarianCountryNames } from "./name.hu";
import { dutchCountryNames } from "./name.nl";
import { countryCodesWithImage } from "./image";

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
    case "fr":
      return frenchCountryNames[country.code];
    case "hu":
      return hungarianCountryNames[country.code];
    case "nl":
      return dutchCountryNames[country.code];
    default:
      return country.name;
  }
}

export function sanitizeCountryName(countryName: string): string {
  return countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[- '()]/g, "")
    .toLowerCase();
}
