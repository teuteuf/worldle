import { useEffect, useState } from "react";

function loadAllHideImageMode(): Record<string, boolean> {
  const storedHideImageMode = localStorage.getItem("hideImageMode");
  return storedHideImageMode != null ? JSON.parse(storedHideImageMode) : {};
}

export function useHideImageMode(
  dayString: string,
  defaultValue: boolean
): [boolean, (hideImageMode: boolean) => void] {
  const [hideImageMode, setHideImageMode] = useState<boolean>(
    loadAllHideImageMode()[dayString] ?? defaultValue
  );

  useEffect(() => {
    const allHideImageMode = loadAllHideImageMode();
    localStorage.setItem(
      "hideImageMode",
      JSON.stringify({
        ...allHideImageMode,
        [dayString]: hideImageMode,
      })
    );
  }, [hideImageMode]);

  return [hideImageMode, setHideImageMode];
}
