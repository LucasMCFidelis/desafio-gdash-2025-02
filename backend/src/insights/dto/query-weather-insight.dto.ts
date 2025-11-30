import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class QueryWeatherInsightDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}

export class QueryWeatherInsightsRangeDto {
  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @IsOptional()
  @IsString()
  start?: string;

  @IsOptional()
  @IsString()
  end?: string;
}
