import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({
  collection: 'roles',
  timestamps: true,
})
export class Role {
  @Prop({
    type: String,
    default: () => randomUUID(),
    required: true,
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
  })
  description: string;

  @Prop({
    type: [String],
    required: true,
  })
  permissions: string[];

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
