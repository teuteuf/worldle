import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      placeholder: "Country, territory...",
      guess: "Guess",
      share: "Share",
      showOnGoogleMaps: "👀 on Google Maps",
      welldone: "Well done!",
      unknownCountry: "Unknown country!",
      copy: "Copied results to clipboard",
      showCountry: "🗺️ Show map!",
      cancelRotation: "🌀 Cancel rotation",
      settings: {
        title: "Settings",
        distanceUnit: "Unit of distance",
        theme: "Theme",
        difficultyModifiers: "Difficulty modifiers",
        gameModeSelection: "Game Mode Selection",
        useRandomCountry: "Use a random country on each refresh instead.",
        startingNextDay: "Starting the next day!",
        noImageMode: "Hide country image for more of a challenge.",
        rotationMode: "Randomly rotate country image.",
      },
      buyMeACoffee: "Buy the original author (teuteuf) a ☕!",
    },
  },
  fr: {
    translation: {
      placeholder: "Pays, territoires...",
      guess: "Deviner",
      share: "Partager",
      showOnGoogleMaps: "👀 sur Google Maps",
      welldone: "Bien joué !",
      unknownCountry: "Pays inconnu !",
      copy: "Résultat copié !",
      showCountry: "🗺️ Afficher la carte !",
      cancelRotation: "🌀 Annule la rotation",
      settings: {
        title: "Paramètres",
        distanceUnit: "Unité de distance",
        theme: "Thème",
        difficultyModifiers: "Modificateurs de difficulté",
        gameModeSelection: "Partie mode de jeu. (Game Mode Selection)",
        useRandomCountry:
          "Utilisez un pays aléatoire à chaque actualisation au lieu. (Use a random country on each refresh instead)",
        startingNextDay: "A partir du lendemain !",
        noImageMode: "Cache l'image du pays pour plus de challenge.",
        rotationMode: "Tourne l'image du pays de manière aléatoire.",
      },
      buyMeACoffee: "Offrez (teuteuf) l'auteur original un ☕ !",
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
