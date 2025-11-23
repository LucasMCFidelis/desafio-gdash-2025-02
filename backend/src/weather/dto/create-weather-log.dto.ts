import { IsISO8601, IsNumber, IsString } from 'class-validator';

export class CreateWeatherLogDto {
  @IsISO8601()
  timestamp: string;

  @IsString()
  location: string;

  @IsString()
  condition: string;

  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;
}
