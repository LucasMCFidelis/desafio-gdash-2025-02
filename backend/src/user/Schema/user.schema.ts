import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, min: 3 })
  name: string;

  @Prop({
    required: true,
    min: 10,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @Prop({ required: true, min: 8, max: 256 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

/**
 * Type retornado por .lean()
 */
export type UserLean = User & { _id: string };
