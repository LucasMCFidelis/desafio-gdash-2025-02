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
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useWeatherInsightsQuery } from "@/hooks/query/use-weather-insights-query";
import { parseInsight } from "@/utils/parse-insights-text";

import ChartCardRoot from "../-components/chart-card-root";

export const Route = createFileRoute("/_app/insights/")({
  component: RouteComponent,
});

const chartConfig = {
  "summary.avg_temperature": {
    label: "Temperatura Média (°C)",
    color: "hsl(var(--chart-1))",
  },
  "summary.avg_feels_like": {
    label: "Sensação Térmica Média (°C)",
    color: "hsl(var(--chart-3))",
  },
  "summary.avg_humidity": {
    label: "Umidade Média (%)",
    color: "hsl(var(--chart-2))",
  },
  "summary.max_temperature": {
    label: "Temperatura Máxima (°C)",
    color: "hsl(var(--chart-5))",
  },
  "summary.min_temperature": {
    label: "Temperatura Mínima (°C)",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

function RouteComponent() {
  const currentDate = new Date();
  const { data: currentWeatherInsightsData } = useWeatherInsightsQuery({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const lastInsight = currentWeatherInsightsData?.at(-1);
  const currentInsightText = lastInsight
    ? parseInsight(lastInsight.insight_text)
    : null;

  return (
    <>
      {currentWeatherInsightsData && currentWeatherInsightsData.length > 0 && (
        <div className="space-y-6">
          {currentInsightText && (
            <>
              <span className="text-primary font-bold">
                {currentInsightText.title}
              </span>
              <p className="">{currentInsightText.content}</p>
            </>
          )}

          <ChartCardRoot
            title="Temperatura ao Longo do Mês"
            description="Dados do mês atual"
          >
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentWeatherInsightsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="summary.avg_temperature"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="summary.max_temperature"
                    stroke="var(--color-chart-5)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="summary.min_temperature"
                    stroke="var(--color-chart-3)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="summary.avg_feels_like"
                    stroke="var(--color-chart-4)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-4)" }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCardRoot>

          <ChartCardRoot
            title="Umidade ao Longo do Mês"
            description="Dados do mês atual"
          >
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentWeatherInsightsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="summary.avg_humidity"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCardRoot>
        </div>
      )}
    </>
  );
}
