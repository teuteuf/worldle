import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      placeholder: "Country, territory...",
      guess: "Guess",
      share: "Share",
      welldone: "Well done!",
      unknownCountry: "Unknown country!",
      copy: "Copied results to clipboard",
      showCountry: "🗺️ Show map!",
      settings: {
        title: "Settings",
        noImageMode:
          "Hide country image for more challenge. (Starting the next day!)",
      },
    },
  },
  fr: {
    translation: {
      placeholder: "Pays, territoires...",
      guess: "Deviner",
      share: "Partager",
      welldone: "Bien joué !",
      unknownCountry: "Pays inconnu !",
      copy: "Résultat copié !",
      showCountry: "🗺️ Afficher la carte !",
      settings: {
        title: "Paramètres",
        noImageMode:
          "Cacher l'image du pays pour plus de challenge. (A partir du lendemain !)",
      },
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
