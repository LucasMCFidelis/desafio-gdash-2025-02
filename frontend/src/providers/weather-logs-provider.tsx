import { WeathersLogsContext } from "@/hooks/contexts/weathers-logs-context";
import { useWeatherLogQuery } from "@/hooks/query/use-weather-log-query";

export const WeatherLogsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const {
    data: currentWeatherLogsData,
    isPending,
    isRefetchError,
  } = useWeatherLogQuery(currentDate);

  const currentLogData =
    currentWeatherLogsData?.[currentWeatherLogsData.length - 1] ?? null;

  return (
    <WeathersLogsContext.Provider
      value={{
        currentDate,
        currentLogData,
        currentWeatherLogsData: currentWeatherLogsData || [],
        isPendingWeatherLogsData: isPending || isRefetchError,
      }}
    >
      {children}
    </WeathersLogsContext.Provider>
  );
};
