import { Body, Controller, Post } from '@nestjs/common';

import { CreateWeatherLogDto } from './dto/create-weather-log.dto';
import { WeatherLean } from './Schema/weather.schema';
import { CreateWeatherLogService } from './services/create-weather-log.service';

@Controller('weather/logs')
export class WeatherController {
  constructor(
    private readonly createWeatherLogService: CreateWeatherLogService,
  ) {}

  @Post()
  async create(@Body() weatherLog: CreateWeatherLogDto): Promise<WeatherLean> {
    return this.createWeatherLogService.execute(weatherLog);
  }
}
