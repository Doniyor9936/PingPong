import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Table' })
    table: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Tarif' })
    tarif: Types.ObjectId;

    @Prop({ min: 0, default: 0 })
    customPrice: number;

    @Prop({ required: true })
    startTime: Date;

    @Prop()
    endDate: Date;

    @Prop({ required: true, enum: ['vip', 'timed'] })
    type: string;

    @Prop({ required: true, default: false })
    paused: boolean;

    @Prop({
        required: true,
        type: [{ name: String, price: { type: Number, min: 0 } }],
        default: []
    })
    extraCosts: { name: string; price: number }[];

    @Prop({ required: true, min: 0 })
    totalPrice: number;

    @Prop({ required: true, enum: ['cash', 'card_Transfer', 'card_Withdraw'] })
    paymentMethod: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
