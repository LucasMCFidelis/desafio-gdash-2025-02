import { createContext, useContext } from "react";

import type { WeatherRecord } from "@/interfaces/weather-record";

interface WeathersLogsContextProps {
  currentDayData?: WeatherRecord;
  processedWeatherLogsData: Array<WeatherRecord>;
  isPendingWeatherLogsData: boolean
}

export const WeathersLogsContext = createContext(
  {} as WeathersLogsContextProps
);

export const useWeathersLogsContext = () => {
  const context = useContext(WeathersLogsContext);

  if (!context) throw new Error("Weathers Logs Provider not found");

  return context;
};
