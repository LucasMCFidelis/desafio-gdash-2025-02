import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateWeatherInsightDto } from '../dto/create-weather-insight.dto';
import {
  WeatherInsight,
  WeatherInsightDocument,
  WeatherInsightLean,
} from '../Schema/insight.schema';

@Injectable()
export class CreateWeatherInsightRepository {
  constructor(
    @InjectModel(WeatherInsight.name)
    private weatherInsightsModel: Model<WeatherInsightDocument>,
  ) {}

  async execute(
    weatherInsight: CreateWeatherInsightDto,
  ): Promise<WeatherInsightLean> {
    const createdWeatherInsight = new this.weatherInsightsModel(weatherInsight);
    await createdWeatherInsight.save();
    const createdWeatherInsightObj = createdWeatherInsight.toObject();

    return {
      ...createdWeatherInsightObj,
      _id: createdWeatherInsight._id.toString(),
    };
  }
}
