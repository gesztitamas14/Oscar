import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Movie's structure
@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: false })
  isWinner: boolean;
}

export type MovieDocument = Movie & Document;

export const MovieSchema = SchemaFactory.createForClass(Movie);
