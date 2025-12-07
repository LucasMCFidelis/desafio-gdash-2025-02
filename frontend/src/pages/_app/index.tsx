import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useWeathersLogsContext } from "@/hooks/contexts/weathers-logs-context";
import { getWeatherLogQueryKey } from "@/hooks/query/use-weather-log-query";

import ChartCardRoot from "./-components/chart-card-root";
import CurrentDayDataInformation from "./-components/current-data-information";
import ExportWeatherLogs from "./-components/export-weathers-logs";
import SkeletonDashboard from "./-components/skeleton-dashboard";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});

const chartConfig = {
  temperature: {
    label: "Temperatura (°C)",
    color: "var(--chart-1)",
  },
  feels_like: {
    label: "Sensação Térmica (°C)",
    color: "var(--chart-4)",
  },
  humidity: {
    label: "Umidade (%)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function RouteComponent() {
  const { currentDate, currentWeatherLogsData, isPendingWeatherLogsData } =
    useWeathersLogsContext();
  const queryClient = useQueryClient();

  if (isPendingWeatherLogsData || !currentWeatherLogsData) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="bg-background">
      <div className="mx-auto space-y-6">
        <CurrentDayDataInformation />

        <div className="flex gap-3">
          <Button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: getWeatherLogQueryKey(currentDate),
              })
            }
          >
            {isPendingWeatherLogsData ? (
              <>
                Recarregando dados <Spinner />
              </>
            ) : (
              <>Recarregar dados</>
            )}
          </Button>

          <ExportWeatherLogs />
        </div>

        {currentWeatherLogsData && currentWeatherLogsData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCardRoot
              title="Temperatura e Sensação Térmica ao Longo do Dia"
              description="Dados das últimas horas"
            >
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentWeatherLogsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke={chartConfig.temperature.color}
                      strokeWidth={2}
                      dot={{ fill: chartConfig.temperature.color }}
                    />
                    <Line
                      type="monotone"
                      dataKey="feels_like"
                      stroke={chartConfig.feels_like.color}
                      strokeWidth={2}
                      dot={{
                        fill: chartConfig.feels_like.color,
                        opacity: "50%",
                      }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartCardRoot>

            <ChartCardRoot
              title="Umidade ao Longo do Dia"
              description="Dados das últimas horas"
            >
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentWeatherLogsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke={chartConfig.humidity.color}
                      strokeWidth={2}
                      dot={{ fill: chartConfig.humidity.color }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartCardRoot>
          </div>
        )}
      </div>
    </div>
  );
}
