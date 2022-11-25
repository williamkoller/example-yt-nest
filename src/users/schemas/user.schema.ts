import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    default: () => randomUUID(),
    required: true,
    unique: true,
    index: true,
  })
  _id!: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
