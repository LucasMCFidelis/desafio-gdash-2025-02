import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { GetWeatherLogsRepository } from '../repositories/get-weather-logs.repository';
import { WeatherDocument, WeatherLean } from '../Schema/weather.schema';

@Injectable()
export class GetWeatherLogService {
  constructor(
    private readonly getWeatherLogRepository: GetWeatherLogsRepository,
  ) {}

  async findMany(params: {
    city?: string;
    date?: string;
  }): Promise<Array<WeatherLean>> {
    const where: FilterQuery<WeatherDocument> = {};

    if (params.city) {
      where.location = params.city;
    }

    if (params.date) {
      const dayStart = new Date(params.date);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(params.date);
      dayEnd.setHours(23, 59, 59, 999);

      where.timestamp = { $gte: dayStart, $lte: dayEnd };
    }

    return this.getWeatherLogRepository.getMany(where);
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
