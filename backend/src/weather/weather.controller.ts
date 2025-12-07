import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Response } from 'express';
import { format } from 'fast-csv';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateWeatherLogDto } from './dto/create-weather-log.dto';
import { WeatherLean } from './Schema/weather.schema';
import { CreateWeatherLogService } from './services/create-weather-log.service';
import { WeatherExportService } from './services/export-weather-logs.service';
import { GetWeatherLogService } from './services/get-weather-logs.service';

@Controller('weather/logs')
export class WeatherController {
  constructor(
    private readonly createWeatherLogService: CreateWeatherLogService,
    private readonly getWeatherLogService: GetWeatherLogService,
    private readonly weatherExportService: WeatherExportService,
  ) {}

  @Post()
  async create(@Body() weatherLog: CreateWeatherLogDto): Promise<WeatherLean> {
    return this.createWeatherLogService.execute(weatherLog);
  }

  @Get()
  async getLogsByQuery(
    @Query('city') city?: string,
    @Query('date') date?: string,
  ): Promise<Array<WeatherLean>> {
    return this.getWeatherLogService.findMany({
      city,
      date,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('export.csv')
  exportCsv(
    @Res() res: Response,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('location') location?: string,
  ) {
    const filename = `weather_export_${new Date().toISOString()}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const stream = format({ headers: true });

    stream.pipe(res);

    try {
      const cursor = this.weatherExportService.streamExport({
        from,
        to,
        location,
      });

      cursor.on('data', (doc) => stream.write(doc));

      cursor.on('end', () => stream.end());
      cursor.on('error', () => {
        stream.end();
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
      });
    } catch (error) {
      console.error(error);
      stream.end();
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }

  @Get(':id')
  async getLog(@Param('id') id?: string): Promise<WeatherLean> {
    return this.getWeatherLogService.findOne(id);
  }
}
