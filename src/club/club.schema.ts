import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ClubDocument = HydratedDocument<Club>;

@Schema()
export class Club {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    owner: Types.ObjectId;

    @Prop({ required: true, type: Object })
    location: {
        lat: number,
        long: number,
        landmark: string
    };
}

export const ClubSchema = SchemaFactory.createForClass(Club);
