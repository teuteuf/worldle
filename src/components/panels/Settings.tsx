import React from "react";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../../hooks/useSettings";
import { Panel } from "./Panel";

interface SettingsProps {
  isOpen: boolean;
  close: () => void;
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
}

export function Settings({
  isOpen,
  close,
  settingsData,
  updateSettings,
}: SettingsProps) {
  const { t } = useTranslation();

  return (
    <Panel title={t("settings.title")} isOpen={isOpen} close={close}>
      <div className="my-4">
        <div className="flex p-1">
          <select
            id="setting-distanceUnit"
            className="h-8 dark:bg-slate-800"
            value={settingsData.distanceUnit}
            onChange={(e) =>
              updateSettings({ distanceUnit: e.target.value as "km" | "miles" })
            }
          >
            <option value="km">KM</option>
            <option value="miles">Miles</option>
          </select>
          <label
            className="flex-1 ml-2 flex items-center"
            htmlFor="setting-distanceUnit"
          >
            {t("settings.distanceUnit")}
          </label>
        </div>
        <div className="flex p-1">
          <select
            id="setting-theme"
            className="h-8 dark:bg-slate-800"
            value={settingsData.theme}
            onChange={(e) =>
              updateSettings({ theme: e.target.value as "light" | "dark" })
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <label
            className="flex-1 ml-2 flex items-center"
            htmlFor="setting-theme"
          >
            {t("settings.theme")}
          </label>
        </div>
      </div>
      <div className="my-4">
        <header className="my-2">
          <h3 className="text-lg font-bold">
            {t("settings.gameModeSelection")}
          </h3>
        </header>
        <div className="flex p-1">
          <input
            type="checkbox"
            id="setting-gameMode"
            checked={settingsData.useRandomCountry}
            onChange={(e) =>
              updateSettings({ useRandomCountry: e.target.checked })
            }
          />
          <label className="flex-1 ml-2" htmlFor="setting-gameMode">
            {t("settings.useRandomCountry")}
          </label>
        </div>
      </div>
      <div className="my-4">
        <header className="my-2">
          <h3 className="text-lg font-bold">
            {t("settings.difficultyModifiers")}
          </h3>
          <div className="text-sm italic text-gray-500">
            {t("settings.startingNextDay")}
          </div>
        </header>
        <div className="flex p-1">
          <input
            type="checkbox"
            id="setting-noImage"
            checked={settingsData.noImageMode}
            onChange={(e) => updateSettings({ noImageMode: e.target.checked })}
          />
          <label className="flex-1 ml-2" htmlFor="setting-noImage">
            {t("settings.noImageMode")}
          </label>
        </div>
        <div className="flex p-1">
          <input
            type="checkbox"
            id="setting-rotationMode"
            checked={settingsData.rotationMode}
            onChange={(e) => updateSettings({ rotationMode: e.target.checked })}
          />
          <label className="flex-1 ml-2" htmlFor="setting-rotationMode">
            {t("settings.rotationMode")}
          </label>
        </div>
      </div>
    </Panel>
  );
}
