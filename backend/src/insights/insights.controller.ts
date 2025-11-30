import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateWeatherInsightDto } from './dto/create-weather-insight.dto';
import {
  QueryWeatherInsightDto,
  QueryWeatherInsightsRangeDto,
} from './dto/query-weather-insight.dto';
import { WeatherInsightLean } from './Schema/insight.schema';
import { CreateWeatherInsightService } from './services/create-weather-insight.service';
import { GetWeatherInsightService } from './services/get-weather-insight.service';

@Controller('weather/insights')
export class InsightsController {
  constructor(
    private readonly createWeatherInsightService: CreateWeatherInsightService,
    private readonly getWeatherInsightsService: GetWeatherInsightService,
  ) {}

  @Post()
  async create(
    @Body() weatherInsight: CreateWeatherInsightDto,
  ): Promise<WeatherInsightLean> {
    return this.createWeatherInsightService.execute(weatherInsight);
  }

  @Get()
  async getInsightByQuery(
    @Query() query: QueryWeatherInsightDto,
  ): Promise<WeatherInsightLean> {
    return this.getWeatherInsightsService.findOne(query);
  }

  @Get('search')
  async search(
    @Query() query: QueryWeatherInsightsRangeDto,
  ): Promise<WeatherInsightLean[]> {
    return this.getWeatherInsightsService.findToRange(query);
  }
}
