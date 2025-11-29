import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SummaryDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  avg_temperature: number;

  @IsNumber()
  avg_feels_like: number;

  @IsNumber()
  avg_humidity: number;

  @IsNumber()
  max_temperature: number;

  @IsNumber()
  min_temperature: number;
}

export class CreateWeatherInsightDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @ValidateNested()
  @Type(() => SummaryDto)
  summary: SummaryDto;

  @IsString()
  @IsNotEmpty()
  insight_text: string;
}
