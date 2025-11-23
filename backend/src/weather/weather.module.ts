import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateWeatherLogRepository } from './repositories/create-weather-log.repository';
import { Weather, WeatherSchema } from './Schema/weather.schema';
import { CreateWeatherLogService } from './services/create-weather-log.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
  controllers: [WeatherController],
  providers: [CreateWeatherLogRepository, CreateWeatherLogService],
  exports: [CreateWeatherLogRepository, CreateWeatherLogService],
})
export class WeatherModule {}
