import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "./components/Game";
import React, { useEffect, useState } from "react";
import { Infos } from "./components/panels/Infos";
import { useTranslation } from "react-i18next";
import { InfosFr } from "./components/panels/InfosFr";
import { Settings } from "./components/panels/Settings";
import { useSettings } from "./hooks/useSettings";
import { Worldle } from "./components/Worldle";
import { Stats } from "./components/panels/Stats";
import { useReactPWAInstall } from "@teuteuf/react-pwa-install";
import { InstallButton } from "./components/InstallButton";

function App() {
  const { t, i18n } = useTranslation();

  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const [settingsData, updateSettings] = useSettings();

  useEffect(() => {
    if (settingsData.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settingsData.theme]);

  return (
    <>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        theme={settingsData.theme}
        autoClose={2000}
        bodyClassName="font-bold text-center"
      />
      {i18n.resolvedLanguage === "fr" ? (
        <InfosFr
          isOpen={infoOpen}
          close={() => setInfoOpen(false)}
          settingsData={settingsData}
        />
      ) : (
        <Infos
          isOpen={infoOpen}
          close={() => setInfoOpen(false)}
          settingsData={settingsData}
        />
      )}
      <Settings
        isOpen={settingsOpen}
        close={() => setSettingsOpen(false)}
        settingsData={settingsData}
        updateSettings={updateSettings}
      />
      <Stats
        isOpen={statsOpen}
        close={() => setStatsOpen(false)}
        distanceUnit={settingsData.distanceUnit}
      />
      <div className="flex justify-center flex-auto dark:bg-slate-900 dark:text-slate-50">
        <div className="w-full max-w-lg flex flex-col">
          <header className="border-b-2 px-3 border-gray-200 flex">
            <button
              className="mr-3 text-xl"
              type="button"
              onClick={() => setInfoOpen(true)}
            >
              ❔
            </button>
            {supported() && !isInstalled() && (
              <InstallButton pwaInstall={pwaInstall} />
            )}
            <h1 className="text-4xl font-bold uppercase tracking-wide text-center my-1 flex-auto">
              Mun<span className="text-green-600">d</span>lo
            </h1>
            <button
              className="ml-3 text-xl"
              type="button"
              onClick={() => setStatsOpen(true)}
            >
              📈
            </button>
            <button
              className="ml-3 text-xl"
              type="button"
              onClick={() => setSettingsOpen(true)}
            >
              ⚙️
            </button>
          </header>
          <Game settingsData={settingsData} />
          <footer className="flex justify-center text-sm mt-8 mb-1">
            ❤️ <Worldle />? -
            <a
              className="underline pl-1"
              href="https://ko-fi.com/eraizel"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("buyMeACoffee")}
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
