import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useWeathersLogsContext } from "@/hooks/contexts/weathers-logs-context";

import CurrentDayDataInformation from "./-components/current-data-information";
import SkeletonDashboard from "./-components/skeleton-dashboard";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});

const chartConfig = {
  temperature: {
    label: "Temperatura (°C)",
    color: "hsl(var(--chart-1))",
  },
  feelsLike: {
    label: "Sensação Térmica (°C)",
    color: "hsl(var(--chart-3))",
  },
  humidity: {
    label: "Umidade (%)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function RouteComponent() {
  const { processedWeatherLogsData, isPendingWeatherLogsData } =
    useWeathersLogsContext();

  if (isPendingWeatherLogsData || !processedWeatherLogsData) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="bg-background">
      <div className="mx-auto space-y-6">
        <CurrentDayDataInformation />

        {processedWeatherLogsData && processedWeatherLogsData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-primary">
                  Temperatura e Sensação Térmica ao Longo do Tempo
                </CardTitle>
                <CardDescription>Dados das últimas horas</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={processedWeatherLogsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="var(--color-chart-1)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-chart-1)" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="feelsLike"
                        stroke="var(--color-chart-3)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-chart-3)" }}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-primary">
                  Umidade ao Longo do Tempo
                </CardTitle>
                <CardDescription>Dados das últimas horas</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={processedWeatherLogsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="var(--color-chart-2)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-chart-2)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
