import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { QueryWeatherInsightDto } from '../dto/query-weather-insight.dto';
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
    if (!date || !city) {
      throw new BadRequestException('date e city são obrigatórios');
    }

    const weatherInsight = await this.getWeatherInsightRepository.getOne({
      date,
      city,
    });

    if (!weatherInsight) {
      throw new NotFoundException('Weather Insight não foi encontrado');
    }

    return weatherInsight;
  }
}
