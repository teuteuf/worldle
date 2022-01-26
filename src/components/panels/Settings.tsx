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
      <div className="flex p-1">
        <input
          type="checkbox"
          id="setting-noImage"
          checked={settingsData.noImageMode}
          onChange={() => {
            console.log("wtf", settingsData.noImageMode);
            return updateSettings({ noImageMode: !settingsData.noImageMode });
          }}
        />
        <label className="flex-1 ml-2" htmlFor="setting-noImage">
          {t("settings.noImageMode")}
        </label>
      </div>
    </Panel>
  );
}
