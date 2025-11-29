import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InsightsController } from './insights.controller';
import { CreateWeatherInsightRepository } from './repositories/create-weather-insight.repository';
import { GetWeatherInsightRepository } from './repositories/get-weather-insight.repository';
import { WeatherInsight, WeatherInsightSchema } from './Schema/insight.schema';
import { CreateWeatherInsightService } from './services/create-weather-insight.service';
import { GetWeatherInsightService } from './services/get-weather-insight.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WeatherInsight.name, schema: WeatherInsightSchema },
    ]),
  ],
  controllers: [InsightsController],
  providers: [
    CreateWeatherInsightRepository,
    CreateWeatherInsightService,
    GetWeatherInsightRepository,
    GetWeatherInsightService,
  ],
  exports: [
    CreateWeatherInsightRepository,
    CreateWeatherInsightService,
    GetWeatherInsightRepository,
    GetWeatherInsightService,
  ],
})
export class InsightsModule {}
