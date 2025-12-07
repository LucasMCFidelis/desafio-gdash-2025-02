import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { useWeathersLogsContext } from "@/hooks/contexts/weathers-logs-context";
import { useExportWeatherLogs } from "@/hooks/mutations/use-export-weather-logs";
import { getWeatherLogQueryKey } from "@/hooks/query/use-weather-log-query";

import ChartCardRoot from "./-components/chart-card-root";
import CurrentDayDataInformation from "./-components/current-data-information";
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
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const queryClient = useQueryClient();
  const exportMutation = useExportWeatherLogs();

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

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button>Exportar dados completos</Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto overflow-hidden p-4 space-y-4"
              align="start"
            >
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />

              <Button
                className="w-full"
                disabled={exportMutation.isPending}
                onClick={() => {
                  if (!dateRange?.from || !dateRange?.to) return;

                  exportMutation.mutate({
                    from: dateRange.from.toISOString().split("T")[0],
                    to: dateRange.to.toISOString().split("T")[0],
                    location:
                      currentWeatherLogsData?.[0]?.location ?? undefined,
                  });

                  setOpen(false);
                }}
              >
                {exportMutation.isPending
                  ? "Exportando..."
                  : "Confirmar Intervalo para Exportar"}
              </Button>
            </PopoverContent>
          </Popover>
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
