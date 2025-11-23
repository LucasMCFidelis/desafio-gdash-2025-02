import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateWeatherLogRepository } from './repositories/create-weather-log.repository';
import { GetWeatherLogsRepository } from './repositories/get-weather-logs.repository';
import { Weather, WeatherSchema } from './Schema/weather.schema';
import { CreateWeatherLogService } from './services/create-weather-log.service';
import { GetWeatherLogService } from './services/get-weather-logs.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
  controllers: [WeatherController],
  providers: [
    CreateWeatherLogRepository,
    CreateWeatherLogService,
    GetWeatherLogsRepository,
    GetWeatherLogService,
  ],
  exports: [
    CreateWeatherLogRepository,
    CreateWeatherLogService,
    GetWeatherLogsRepository,
    GetWeatherLogService,
  ],
})
export class WeatherModule {}
