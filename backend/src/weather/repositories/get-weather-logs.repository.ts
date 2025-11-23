import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Weather,
  WeatherDocument,
  WeatherLean,
} from '../Schema/weather.schema';

@Injectable()
export class GetWeatherLogsRepository {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
  ) {}

  async getAll(): Promise<Array<WeatherLean>> {
    const allWeathers = await this.weatherModel.find();

    const mappedWeathers = allWeathers.map((weather) => {
      const obj = weather.toObject();

      return {
        ...obj,
        _id: weather._id.toString(),
      };
    });

    return mappedWeathers;
  }

  async getOne(weatherLogId: string): Promise<WeatherLean | null> {
    const weatherLog = await this.weatherModel.findById(weatherLogId).lean();

    if (!weatherLog) return null;

    return { ...weatherLog, _id: weatherLog._id.toString() };
  }
}
