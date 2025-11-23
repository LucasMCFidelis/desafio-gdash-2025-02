import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateWeatherLogDto } from './dto/create-weather-log.dto';
import { WeatherLean } from './Schema/weather.schema';
import { CreateWeatherLogService } from './services/create-weather-log.service';
import { GetWeatherLogService } from './services/get-weather-logs.service';

@Controller('weather/logs')
export class WeatherController {
  constructor(
    private readonly createWeatherLogService: CreateWeatherLogService,
    private readonly getWeatherLogService: GetWeatherLogService,
  ) {}

  @Post()
  async create(@Body() weatherLog: CreateWeatherLogDto): Promise<WeatherLean> {
    return this.createWeatherLogService.execute(weatherLog);
  }

  @Get()
  async getAllLogs(): Promise<Array<WeatherLean>> {
    return this.getWeatherLogService.findAll();
  }

  @Get(':id')
  async getLog(@Param('id') id?: string): Promise<WeatherLean> {
    return this.getWeatherLogService.findOne(id);
  }
}
