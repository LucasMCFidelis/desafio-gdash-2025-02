import { Injectable } from '@nestjs/common';

import { CreateWeatherLogDto } from '../dto/create-weather-log.dto';
import { CreateWeatherLogRepository } from '../repositories/create-weather-log.repository';
import { WeatherLean } from '../Schema/weather.schema';

@Injectable()
export class CreateWeatherLogService {
  constructor(
    private readonly createWeatherLogRepository: CreateWeatherLogRepository,
  ) {}

  async execute(weatherLog: CreateWeatherLogDto): Promise<WeatherLean> {
    const newWeatherLog =
      await this.createWeatherLogRepository.execute(weatherLog);

    return newWeatherLog;
  }
}
