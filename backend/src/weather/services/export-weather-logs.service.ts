import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workbook, Worksheet } from 'exceljs';
import { Model } from 'mongoose';

import { Weather, WeatherDocument } from '../Schema/weather.schema';

export interface ExportFilters {
  from?: string;
  to?: string;
  location?: string;
}

interface DateRangeFilter {
  $gte?: Date;
  $lte?: Date;
}

interface WeatherQuery {
  location?: string;
  timestamp?: DateRangeFilter;
}

@Injectable()
export class WeatherExportService {
  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<WeatherDocument>,
  ) {}

  private readonly DEFAULT_CITY = 'Junco do Seridó';

  private isValidDate(value?: string): boolean {
    return value !== undefined && !isNaN(new Date(value).getTime());
  }

  buildQuery(filters: ExportFilters): WeatherQuery {
    const query: WeatherQuery = {
      location: filters.location || this.DEFAULT_CITY,
    };

    const { from, to } = filters;

    const hasValidFrom = this.isValidDate(from);
    const hasValidTo = this.isValidDate(to);

    if (hasValidFrom && hasValidTo && from === to) {
      const day = new Date(from as string);

      const startOfDay = new Date(day);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(day);
      endOfDay.setHours(23, 59, 59, 999);

      query.timestamp = {
        $gte: startOfDay,
        $lte: endOfDay,
      };

      return query;
    }

    const range: DateRangeFilter = {};

    if (hasValidFrom) {
      const start = new Date(from as string);
      start.setHours(0, 0, 0, 0);
      range.$gte = start;
    }

    if (hasValidTo) {
      const end = new Date(to as string);
      end.setHours(23, 59, 59, 999);
      range.$lte = end;
    }

    if (Object.keys(range).length > 0) {
      query.timestamp = range;
    }

    return query;
  }

  streamExport(filters: ExportFilters) {
    const query = this.buildQuery(filters);

    return this.weatherModel
      .find(query)
      .lean()
      .cursor()
      .map((doc: Weather) => ({
        timestamp: doc.timestamp?.toISOString(),
        location: doc.location,
        condition: doc.condition,
        temperature: doc.temperature,
        feels_like: doc.feels_like,
        humidity: doc.humidity,
      }));
  }

  async exportXlsx(filters: ExportFilters): Promise<Workbook> {
    const query = this.buildQuery(filters);

    const docs = await this.weatherModel.find(query).lean().exec();

    const workbook: Workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Weather Logs');

    worksheet.columns = [
      { header: 'Timestamp', key: 'timestamp', width: 25 },
      { header: 'Location', key: 'location', width: 20 },
      { header: 'Condition', key: 'condition', width: 20 },
      { header: 'Temperature', key: 'temperature', width: 15 },
      { header: 'Feels Like', key: 'feels_like', width: 15 },
      { header: 'Humidity', key: 'humidity', width: 15 },
    ];

    for (const doc of docs) {
      worksheet.addRow({
        timestamp: doc.timestamp?.toISOString(),
        location: doc.location,
        condition: doc.condition,
        temperature: doc.temperature,
        feels_like: doc.feels_like,
        humidity: doc.humidity,
      });
    }

    return workbook;
  }
}
