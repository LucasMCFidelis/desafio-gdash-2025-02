import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GetWeatherLogsRepository } from '../repositories/get-weather-logs.repository';
import { WeatherLean } from '../Schema/weather.schema';

@Injectable()
export class GetWeatherLogService {
  constructor(
    private readonly getWeatherLogRepository: GetWeatherLogsRepository,
  ) {}

  async findAll(): Promise<Array<WeatherLean>> {
    return await this.getWeatherLogRepository.getAll();
  }

  async findOne(weatherLogId?: string): Promise<WeatherLean> {
    if (!weatherLogId) {
      throw new BadRequestException('weatherLogId é obrigatório');
    }

    try {
      const weatherLog =
        await this.getWeatherLogRepository.getOne(weatherLogId);

      if (!weatherLog) {
        throw new NotFoundException(
          'Weather log com id informado não foi encontrado',
        );
      }

      return weatherLog;
    } catch (error) {
      if (error instanceof Error && error.name === 'CastError') {
        throw new BadRequestException('Id informado é inválido');
      }

      throw error;
    }
  }
}
