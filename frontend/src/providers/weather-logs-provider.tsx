import { WeathersLogsContext } from "@/contexts/weathers-logs-context";

export const WeatherLogsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const chartData = [
    {
      _id: "1",
      timestamp: "2025-11-25T23:23:36.000Z",
      location: "Junco do Seridó",
      condition: "broken clouds",
      temperature: 23.4,
      humidity: 68,
    },
    {
      _id: "2",
      timestamp: "2025-11-26T00:00:00.000Z",
      location: "Junco do Seridó",
      condition: "clear sky",
      temperature: 26.8,
      humidity: 60,
    },
    {
      _id: "3",
      timestamp: "2025-11-26T01:00:00.000Z",
      location: "Junco do Seridó",
      condition: "few clouds",
      temperature: 21.1,
      humidity: 72,
    },
    {
      _id: "4",
      timestamp: "2025-11-26T02:00:00.000Z",
      location: "Junco do Seridó",
      condition: "few clouds",
      temperature: 27.3,
      humidity: 63,
    },
    {
      _id: "5",
      timestamp: "2025-11-26T03:00:00.000Z",
      location: "Junco do Seridó",
      condition: "overcast clouds",
      temperature: 19.9,
      humidity: 80,
    },
    {
      _id: "6",
      timestamp: "2025-11-26T04:00:00.000Z",
      location: "Junco do Seridó",
      condition: "clear sky",
      temperature: 24.5,
      humidity: 70,
    },
    {
      _id: "7",
      timestamp: "2025-11-26T05:00:00.000Z",
      location: "Junco do Seridó",
      condition: "broken clouds",
      temperature: 22.2,
      humidity: 75,
    },
    {
      _id: "8",
      timestamp: "2025-11-26T06:00:00.000Z",
      location: "Junco do Seridó",
      condition: "clear sky",
      temperature: 29.1,
      humidity: 55,
    },
    {
      _id: "9",
      timestamp: "2025-11-26T07:00:00.000Z",
      location: "Junco do Seridó",
      condition: "few clouds",
      temperature: 20.4,
      humidity: 78,
    },
  ];

  const isPending = false;

  const processedWeatherLogsData = chartData.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp),
    time: new Date(item.timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const currentDayData =
    processedWeatherLogsData[processedWeatherLogsData.length - 1];

  return (
    <WeathersLogsContext.Provider
      value={{
        currentDayData,
        processedWeatherLogsData,
        isPendingWeatherLogsData: isPending
      }}
    >
      {children}
    </WeathersLogsContext.Provider>
  );
};
