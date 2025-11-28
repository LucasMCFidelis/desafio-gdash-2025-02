import { createContext, useContext } from "react";

import type { WeatherRecord } from "@/interfaces/weather-record";

interface WeathersLogsContextProps {
  currentDate: string
  currentLogData: WeatherRecord | null;
  currentWeatherLogsData: Array<WeatherRecord>;
  isPendingWeatherLogsData: boolean;
}

export const WeathersLogsContext = createContext(
  {} as WeathersLogsContextProps
);

export const useWeathersLogsContext = () => {
  const context = useContext(WeathersLogsContext);

  if (!context) throw new Error("Weathers Logs Provider not found");

  return context;
};
