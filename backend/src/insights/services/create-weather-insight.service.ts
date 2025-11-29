import { Injectable } from '@nestjs/common';

import { CreateWeatherInsightDto } from '../dto/create-weather-insight.dto';
import { CreateWeatherInsightRepository } from '../repositories/create-weather-insight.repository';
import { GetWeatherInsightRepository } from '../repositories/get-weather-insight.repository';
import { WeatherInsightLean } from '../Schema/insight.schema';

@Injectable()
export class CreateWeatherInsightService {
  constructor(
    private readonly createWeatherInsightRepository: CreateWeatherInsightRepository,
    private readonly getWeatherInsightRepository: GetWeatherInsightRepository,
  ) {}

  async execute(
    weatherInsight: CreateWeatherInsightDto,
  ): Promise<WeatherInsightLean> {
    await this.getWeatherInsightRepository.checkExistingInsight({
      date: weatherInsight.date,
      city: weatherInsight.city,
    });
    const newWeatherInsight =
      await this.createWeatherInsightRepository.execute(weatherInsight);

    return newWeatherInsight;
  }
}
