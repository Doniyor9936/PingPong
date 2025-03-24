import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ClubDocument = HydratedDocument<Club>;

@Schema()
export class Club {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Table' }] })
    tables: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Traffic' }] })
    traffic: Types.ObjectId[];

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    owner: Types.ObjectId;

    @Prop({ required: true })
    location: string;
}

export const ClubSchema = SchemaFactory.createForClass(Club);
