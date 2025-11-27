import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { mapWeatherLogResponse } from "@/utils/map-weather-log-response";

export const getWeatherLogQueryKey = (date?: string) =>
  ["weather-logs-to-date", date] as const;

export const useWeatherLogQuery = (date?: string) => {
  return useQuery({
    queryKey: getWeatherLogQueryKey(date),
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/weather/logs?date=${date}`
      );
      const processedWeatherLogsData = mapWeatherLogResponse(response);
      return processedWeatherLogsData;
    },
  });
};
