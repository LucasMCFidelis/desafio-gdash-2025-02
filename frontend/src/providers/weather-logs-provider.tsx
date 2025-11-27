import { WeathersLogsContext } from "@/hooks/contexts/weathers-logs-context";
import { useWeatherLogQuery } from "@/hooks/query/use-weather-log-query";

export const WeatherLogsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const date = new Date().toISOString().split("T")[0];

  const { data: processedWeatherLogsData, isPending } =
    useWeatherLogQuery(date);

  const currentDayData =
    processedWeatherLogsData?.[processedWeatherLogsData.length - 1] ?? null;

  return (
    <WeathersLogsContext.Provider
      value={{
        currentDayData,
        processedWeatherLogsData: processedWeatherLogsData || [],
        isPendingWeatherLogsData: isPending,
      }}
    >
      {children}
    </WeathersLogsContext.Provider>
  );
};
