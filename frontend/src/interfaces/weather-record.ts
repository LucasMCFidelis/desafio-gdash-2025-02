export interface WeatherRecordBase {
  timestamp: Date;
  location: string;
  condition: string;
  temperature: number;
  feels_like: number;
  humidity: number;
}

export interface WeatherRecord extends WeatherRecordBase {
  time: string;
}
