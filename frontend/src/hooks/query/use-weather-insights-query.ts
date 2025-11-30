import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { WeatherInsight } from "@/interfaces/weather-insight";
import { mapWeatherInsights } from "@/utils/map-weather-insights";

interface InsightsQueryParams {
  month?: number;
  year?: number;
}

export const getWeatherInsightsQueryKey = ({
  month,
  year,
}: InsightsQueryParams) => ["weather-insights", month, year] as const;

export const useWeatherInsightsQuery = (query: InsightsQueryParams) => {
  return useQuery<Array<WeatherInsight>>({
    queryKey: getWeatherInsightsQueryKey(query),
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/weather/insights/search?month=${query.month}&year=${query.year}`
      );

      return mapWeatherInsights(response.data);
    },
  });
};
