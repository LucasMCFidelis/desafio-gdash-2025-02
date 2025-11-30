import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  QueryWeatherInsightDto,
  QueryWeatherInsightsRangeDto,
} from '../dto/query-weather-insight.dto';
import { GetWeatherInsightRepository } from '../repositories/get-weather-insight.repository';
import { WeatherInsightLean } from '../Schema/insight.schema';

@Injectable()
export class GetWeatherInsightService {
  constructor(
    private readonly getWeatherInsightRepository: GetWeatherInsightRepository,
  ) {}

  async findOne({
    city,
    date,
  }: QueryWeatherInsightDto): Promise<WeatherInsightLean> {
    const weatherInsight = await this.getWeatherInsightRepository.getOne({
      date,
      city,
    });

    if (!weatherInsight) {
      throw new NotFoundException('Weather Insight não foi encontrado');
    }

    return weatherInsight;
  }

  async findToRange(
    query: QueryWeatherInsightsRangeDto,
  ): Promise<Array<WeatherInsightLean>> {
    const { month, year, start, end } = query;

    const isMonthYear = month && year;
    const isInterval = start && end;

    if (!isMonthYear && !isInterval) {
      throw new BadRequestException(
        'Você deve fornecer month + year ou start + end.',
      );
    }

    return this.getWeatherInsightRepository.findMany(query);
  }
}
