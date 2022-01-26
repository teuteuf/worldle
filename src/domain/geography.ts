const MAX_DISTANCE_ON_EARTH = 20_000_000;

export type Direction =
  | "S"
  | "W"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "SSW"
  | "SW"
  | "WSW"
  | "WNW"
  | "NW"
  | "NNW"
  | "N";

export function computeProximityPercent(distance: number): number {
  const proximity = Math.max(MAX_DISTANCE_ON_EARTH - distance, 0);
  return Math.round((proximity / MAX_DISTANCE_ON_EARTH) * 100);
}
