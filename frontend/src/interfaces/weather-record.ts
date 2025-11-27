export interface WeatherRecordBase {
  timestamp: Date;
  location: string;
  condition: string;
  temperature: number;
  humidity: number;
}

export interface WeatherRecord extends WeatherRecordBase {
  time: string
}