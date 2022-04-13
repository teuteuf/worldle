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
      showOnWikipedia: "📚 on Wikipedia",
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
        startingNextDay: "Starting the next day!",
        noImageMode: "Hide country image for more of a challenge.",
        rotationMode: "Randomly rotate country image.",
      },
      stats: {
        title: "Statistics",
        played: "Played",
        win: "Win %",
        currentStreak: "Current Streak",
        maxStreak: "Max Streak",
        averageBestDistance: "Best Distances Average",
        guessDistribution: "Guess distribution:",
      },
      install: {
        title: "Worldle",
        descritpionTitle: "App Install:",
        description: "Add Worldle to Home Screen to play it easily!",
        instructionTitle: "Instructions:",
        instructionActionOk: "OK",
        instructionActionCancel: "Cancel",
        instructionActionInstall: "Install",
        instructionFirefoxAction1: "- open browser options ",
        instructionFirefoxAction2: "- add to Home Screen",
        instructionFirefoxNewAction1: "- open browser options ",
        instructionFirefoxNewAction2: '- select "Install"',
        instructionIdeviceAction1: "- on Safari, open the Share menu ",
        instructionIdeviceAction2: '- select "Add to Home Screen"',
        instructionOperaAction1: "- press the menu button ",
        instructionOperaAction2: "- add to Home Screen",
        instructionNotSupported: "Not supported by this browser.",
      },
      support: {
        UA: "Support the Ukrainian Red Cross",
      },
      newVersion: "New version available! <br/> Click here to update!",
      buyMeACoffee: "Buy me a ☕!",
    },
  },
  fr: {
    translation: {
      placeholder: "Pays, territoires...",
      guess: "Deviner",
      share: "Partager",
      showOnGoogleMaps: "👀 sur Google Maps",
      showOnWikipedia: "📚 sur Wikipedia",
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
        startingNextDay: "A partir du lendemain !",
        noImageMode: "Cache l'image du pays pour plus de challenge.",
        rotationMode: "Tourne l'image du pays de manière aléatoire.",
      },
      stats: {
        title: "Statistiques",
        played: "Parties",
        win: "Victoires %",
        currentStreak: "Série Actuelle",
        maxStreak: "Série Max",
        averageBestDistance: "Moyenne Meilleures Distances",
        guessDistribution: "Répartitions des victoires:",
      },
      install: {
        title: "Worldle",
        descritpionTitle: "Installer l'app:",
        description:
          "Ajouter Worldle sur l'écran d'accueil pour le retrouver plus facilement !",
        instructionTitle: "Instructions :",
        instructionActionOk: "OK",
        instructionActionCancel: "Annuler",
        instructionActionInstall: "Installer",
        instructionFirefoxAction1: "- ouvrir les options du navigateur ",
        instructionFirefoxAction2: "- ajouter à votre écran d'accueil",
        instructionFirefoxNewAction1: "- ouvrir les options du navigateur ",
        instructionFirefoxNewAction2: '- sélectionner "Installer"',
        instructionIdeviceAction1: "- sur Safari, ouvrir le menu de partage ",
        instructionIdeviceAction2: "- sélectionner \"Sur l'écran d'accueil\"",
        instructionOperaAction1: "- appuyer sur le bouton menu ",
        instructionOperaAction2: "- ajouter à l'écran d'accueil",
        instructionNotSupported: "Impossible sur ce navigateur.",
      },
      support: {
        UA: "Soutenez la Croix Rouge Ukrainienne",
      },
      newVersion:
        "Nouvelle version disponible ! <br/> Cliquez ici pour mettre à jour !",
      buyMeACoffee: "Offrez moi un ☕ !",
    },
  },
  es: {
    translation: {
      placeholder: "País, Territorios...",
      guess: "Adivinar",
      share: "Compartir",
      showOnGoogleMaps: "👀 en Google Maps",
      welldone: "Bien hecho !",
      unknownCountry: "País desconocido !",
      copy: "Resultado copiado !",
      showCountry: "🗺️ mostrar mapa !",
      cancelRotation: "🌀 Anular la rotacíon",
      settings: {
        title: "Parámetros",
        distanceUnit: "Unidad de distancia",
        theme: "Tema",
        difficultyModifiers: "Modificador de dificultad",
        startingNextDay: "A partir de mañana!",
        noImageMode: "Oculte la imagen del país para un mayor desafío.",
        rotationMode: "Gira la imagen del país aleatoriamente.",
      },
      stats: {
        title: "Estadísticas",
        played: "Jugadas",
        win: "Ganadas %",
        currentStreak: "Serie Actual",
        maxStreak: "Serie Max",
        averageBestDistance: "Mejor distancia media",
        guessDistribution: "Distribución de aciertos:",
      },
      buyMeACoffee: "Ofrézcame un ☕ !",
    },
  },
  eu: {
    translation: {
      placeholder: "Estatua, herrialdeak...",
      guess: "Asmatu",
      share: "Elkarbanatu",
      showOnGoogleMaps: "👀 Google Maps-en",
      showOnWikipedia: "📚 Megtekintés Wikipédián",
      welldone: "Ongi egina !",
      unknownCountry: "Estatu ezezaguna !",
      copy: "Emaitzak arbelean kopiatuta !",
      showCountry: "🗺️ Erakutsi mapan !",
      cancelRotation: "🌀 Ezeztatu errotazioa",
      settings: {
        title: "Aukerak",
        distanceUnit: "Distantzia unitateak",
        theme: "Gaia",
        difficultyModifiers: "Zailtasun aldagaiak",
        startingNextDay: "Aldaketak bihartik aurrera ikusgai!",
        noImageMode: "Ezkutatu herriaren irudia zailagoa egiteko.",
        rotationMode: "Errotatu ausaz herrialdearen irudia.",
      },
      stats: {
        title: "Estatistikak",
        played: "Jokatuta",
        win: "Irabaziak %",
        currentStreak: "Uneko seriea",
        maxStreak: "Serie Max",
        averageBestDistance: "Batazbesteko distantzia onenea",
        guessDistribution: "Asmatze banaketa:",
      },
      buyMeACoffee: "☕ bat eskaini iezaidazu !",
    },
  },
  hu: {
    translation: {
      placeholder: "Ország, terület...",
      guess: "Tippelés",
      share: "Megosztás",
      showOnGoogleMaps: "👀 Google Maps-en",
      welldone: "Szép munka!",
      unknownCountry: "Ismeretlen ország!",
      countryDuplication: "Már tippelted ezt az országot!",
      copy: "Eredmény kimásolva vágólapra",
      showCountry: "🗺️ Mutasd a térképet!",
      cancelRotation: "🌀 Elforgatás kikapcsolása",
      settings: {
        title: "Beállítások",
        distanceUnit: "Távolság mértékegysége",
        theme: "Téma",
        difficultyModifiers: "Nehézségi beállítások",
        startingNextDay: "A holnapi naptól!",
        noImageMode: "Vaktérkép elrejtése.",
        rotationMode: "Vaktérkép véletlenszerű elforgatása.",
      },
      stats: {
        title: "Statisztikák",
        played: "Játszott",
        win: "Eltalált %",
        currentStreak: "Jelenlegi Streak",
        maxStreak: "Max Streak",
        averageBestDistance: "Legközelebbi tippek átlaga",
        guessDistribution: "Találatok eloszlása:",
      },
      install: {
        title: "Worldle",
        descritpionTitle: "App Letöltése:",
        description:
          "Add hozzá a Worldle a Kezdőképernyőhöz, hogy egyszerűbben játszhass!",
        instructionTitle: "In",
        instructionActionOk: "OK",
        instructionActionCancel: "Mégse",
        instructionActionInstall: "Telepítés",
        instructionFirefoxAction1: "- nyisd meg a böngésző beállításokat ",
        instructionFirefoxAction2: "- hozzáadás Kezdőképernyőhöz",
        instructionFirefoxNewAction1: "- nyisd meg a böngésző beállításokat ",
        instructionFirefoxNewAction2: '- válaszd a "Telepítés"-t',
        instructionIdeviceAction1: "- nyisd meg a megosztás menüt ",
        instructionIdeviceAction2:
          '- válaszd a "Hozzáadás Főképernyőhöz" menüpontot',
        instructionOperaAction1: "- nyisd meg a főmenüt ",
        instructionOperaAction2: "- hozzáadás Főképernyőhöz",
        instructionNotSupported: "Nem támogatott böngészőt használsz!",
      },
      support: {
        UA: "Ukrán Vöröskereszt támogatása",
      },
      buyMeACoffee: "Vegyél nekem egy ☕-t!",
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
    fallbackLng: "en",
  });

export default i18n;
