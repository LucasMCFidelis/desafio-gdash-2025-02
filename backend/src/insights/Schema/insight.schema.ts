import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WeatherInsightDocument = HydratedDocument<WeatherInsight>;

@Schema({ _id: false })
class Summary {
  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: Number, required: true })
  avg_temperature: number;

  @Prop({ type: Number, required: true })
  avg_feels_like: number;

  @Prop({ type: Number, required: true })
  avg_humidity: number;

  @Prop({ type: Number, required: true })
  max_temperature: number;

  @Prop({ type: Number, required: true })
  min_temperature: number;
}

@Schema({ timestamps: true })
export class WeatherInsight {
  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true, unique: true })
  date: string;

  @Prop({ type: Summary, required: true })
  summary: Summary;

  @Prop({ type: String, required: true })
  insight_text: string;
}

export const WeatherInsightSchema =
  SchemaFactory.createForClass(WeatherInsight);

export type WeatherInsightLean = WeatherInsight & { _id: string };
