import type { WeatherInsight } from "@/interfaces/weather-insight";

export function mapWeatherInsights(data: unknown): Array<WeatherInsight> {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    _id: String(item._id),
    city: String(item.city),
    date: String(item.date),
    insight_text: String(item.insight_text),
    createdAt: String(item.createdAt),
    updatedAt: String(item.updatedAt),

    summary: {
      city: String(item.summary.city),
      date: String(item.summary.date),
      avg_temperature: Number(item.summary.avg_temperature),
      avg_feels_like: Number(item.summary.avg_feels_like),
      avg_humidity: Number(item.summary.avg_humidity),
      max_temperature: Number(item.summary.max_temperature),
      min_temperature: Number(item.summary.min_temperature),
    },
  }));
}
