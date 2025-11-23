import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateWeatherLogDto } from '../dto/create-weather-log.dto';
import {
  Weather,
  WeatherDocument,
  WeatherLean,
} from '../Schema/weather.schema';

@Injectable()
export class CreateWeatherLogRepository {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
  ) {}

  async execute(weatherLog: CreateWeatherLogDto): Promise<WeatherLean> {
    const createdWeatherLog = new this.weatherModel(weatherLog);
    const createdWeatherLogObj = createdWeatherLog.toObject();

    await createdWeatherLog.save();

    return {
      ...createdWeatherLogObj,
      _id: createdWeatherLog._id.toString(),
    };
  }
}
