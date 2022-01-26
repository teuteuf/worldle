import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "./components/Game";
import React, { useState } from "react";
import { Infos } from "./components/panels/Infos";
import { useTranslation } from "react-i18next";
import { InfosFr } from "./components/panels/InfosFr";
import { Settings } from "./components/panels/Settings";
import { useSettings } from "./hooks/useSettings";

function App() {
  const { i18n } = useTranslation();

  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [settingsData, updateSettings] = useSettings();

  return (
    <>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        theme="light"
        autoClose={2000}
        bodyClassName="font-bold text-center"
      />
      {i18n.resolvedLanguage === "fr" ? (
        <InfosFr isOpen={infoOpen} close={() => setInfoOpen(false)} />
      ) : (
        <Infos isOpen={infoOpen} close={() => setInfoOpen(false)} />
      )}
      <Settings
        isOpen={settingsOpen}
        close={() => setSettingsOpen(false)}
        settingsData={settingsData}
        updateSettings={updateSettings}
      />
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <header className="border-b-2 border-gray-200 flex">
            <button
              className="mx-3 text-xl"
              type="button"
              onClick={() => setInfoOpen(true)}
            >
              ❔
            </button>
            <h1 className="text-4xl font-bold uppercase tracking-wide text-center my-1 flex-auto">
              Wor<span className="text-green-600">l</span>dle
            </h1>
            <button
              className="mx-3 text-xl"
              type="button"
              onClick={() => setSettingsOpen(true)}
            >
              ⚙️
            </button>
          </header>
          <Game settingsData={settingsData} />
        </div>
      </div>
    </>
  );
}

export default App;
