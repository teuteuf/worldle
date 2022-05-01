import { useCallback, useMemo, useState } from "react";

export interface SettingsData {
  noImageMode: boolean;
  rotationMode: boolean;
  distanceUnit: "km" | "miles";
  theme: "light" | "dark";
  shiftDayCount: number;
  allowShiftingDay: boolean;
  updateNotificationDisabled: boolean;
}

export type SettingsStorageData = Omit<SettingsData, "theme"> & {
  themePreference: "light" | "dark" | "no-preference";
};

const defaultSettingsData: SettingsStorageData = {
  noImageMode: false,
  rotationMode: false,
  distanceUnit: "km",
  themePreference: "no-preference",
  shiftDayCount: 0,
  allowShiftingDay: false,
  updateNotificationDisabled: false,
};

function loadSettings(): SettingsStorageData {
  const storedSettings = localStorage.getItem("settings");
  const settingsData = storedSettings != null ? JSON.parse(storedSettings) : {};
  return {
    ...defaultSettingsData,
    ...settingsData,
  };
}
export function useSettings(): [
  SettingsData,
  SettingsStorageData,
  (newSettings: Partial<SettingsStorageData>) => void
] {
  const [settingsStorageData, setSettingsStorageData] =
    useState<SettingsStorageData>(loadSettings());

  const settingsData = useMemo(() => {
    const { themePreference, ...settingsData } = settingsStorageData;
    const theme =
      themePreference === "no-preference"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : themePreference;
    return { ...settingsData, theme };
  }, [settingsStorageData]);

  const updateSettingsStorageData = useCallback(
    (newSettings: Partial<SettingsStorageData>) => {
      const updatedSettings = {
        ...settingsStorageData,
        ...newSettings,
      };

      setSettingsStorageData(updatedSettings);
      localStorage.setItem("settings", JSON.stringify(updatedSettings));
    },
    [settingsStorageData]
  );

  return [settingsData, settingsStorageData, updateSettingsStorageData];
}
