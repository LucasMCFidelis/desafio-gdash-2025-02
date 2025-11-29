import { IsNotEmpty, IsString } from 'class-validator';

export class QueryWeatherInsightDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
