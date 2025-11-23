import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WeatherDocument = HydratedDocument<Weather>;

@Schema({ timestamps: false })
export class Weather {
  @Prop({ type: String, required: true })
  timestamp: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: String, required: true })
  condition: string;

  @Prop({ type: Number, required: true })
  temperature: number;

  @Prop({ type: Number, required: true })
  humidity: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

export type WeatherLean = Weather & { _id: string };
