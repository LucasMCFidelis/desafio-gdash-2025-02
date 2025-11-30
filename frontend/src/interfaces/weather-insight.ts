export interface WeatherInsightSummary {
  city: string;
  date: string;
  avg_temperature: number;
  avg_feels_like: number;
  avg_humidity: number;
  max_temperature: number;
  min_temperature: number;
}

export interface WeatherInsight {
  _id: string;
  city: string;
  date: string;
  summary: WeatherInsightSummary;
  insight_text: string;
  createdAt: string;
  updatedAt: string;
}
