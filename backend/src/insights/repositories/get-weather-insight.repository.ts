import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import {
  QueryWeatherInsightDto,
  QueryWeatherInsightsRangeDto,
} from '../dto/query-weather-insight.dto';
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
  DEFAULT_CITY: string = 'Junco do Seridó';

  async getOne({
    date,
    city,
  }: QueryWeatherInsightDto): Promise<WeatherInsightLean | null> {
    const weatherInsight = await this.weatherInsightsModel
      .findOne({ date, city: city ?? this.DEFAULT_CITY })
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

  async findMany(
    filters: QueryWeatherInsightsRangeDto,
  ): Promise<Array<WeatherInsightLean>> {
    const { city, month, year, start, end } = filters;

    const query: FilterQuery<WeatherInsightDocument> = {
      city: city ?? this.DEFAULT_CITY,
    };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = {
        $gte: startDate.toISOString().split('T')[0],
        $lte: endDate.toISOString().split('T')[0],
      };
    }

    if (start && end) {
      query.date = {
        $gte: start,
        $lte: end,
      };
    }

    const result = await this.weatherInsightsModel
      .find(query)
      .sort({ date: 1 })
      .lean();

    return result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  }
}
