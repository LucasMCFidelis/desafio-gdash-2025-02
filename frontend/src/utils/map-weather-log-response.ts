import type { AxiosResponse } from "axios";

import type {
  WeatherRecord,
  WeatherRecordBase,
} from "@/interfaces/weather-record";

export const mapWeatherLogResponse = (
  response: AxiosResponse
): Array<WeatherRecord> => {
  if (!response || !response.data) {
    throw new Error("Erro ao buscar logs");
  }

  const processedWeatherLogsData = response.data.map(
    (item: WeatherRecordBase) => ({
      ...item,
      timestamp: new Date(item.timestamp),
      time: new Date(item.timestamp).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    })
  );

  return processedWeatherLogsData;
};
