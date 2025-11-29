import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { QueryWeatherInsightDto } from '../dto/query-weather-insight.dto';
import {
  WeatherInsight,
  WeatherInsightDocument,
  WeatherInsightLean,
} from '../Schema/insight.schema';

@Injectable()
export class GetWeatherInsightRepository {
  constructor(
    @InjectModel(WeatherInsight.name)
    private weatherInsightsModel: Model<WeatherInsightDocument>,
  ) {}

  async getOne({
    date,
    city,
  }: QueryWeatherInsightDto): Promise<WeatherInsightLean | null> {
    const weatherInsight = await this.weatherInsightsModel
      .findOne({ date, city })
      .lean();

    if (!weatherInsight) return null;

    return { ...weatherInsight, _id: weatherInsight._id.toString() };
  }

  async checkExistingInsight({
    date,
    city,
  }: QueryWeatherInsightDto): Promise<WeatherInsightLean | null> {
    const weatherInsight = await this.getOne({ date, city });

    if (weatherInsight) {
      throw new ConflictException(
        'Já existe um insight registrado para essa data',
      );
    }

    return weatherInsight;
  }
}
