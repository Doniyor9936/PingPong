import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TarifDocument = HydratedDocument<Tarif>;

@Schema()
export class Tarif {
    @Prop({ required: true, trim: true, minlength: 3, maxlength: 50 })
    name: string;

    @Prop({ required: true, min: 0 })
    pricePerHour: number;

    @Prop({ type: [String], default: [] })
    rackets: string[];

    @Prop({ required: true, type: Types.ObjectId, ref: 'Club' })
    club: Types.ObjectId;
}

export const TarifSchema = SchemaFactory.createForClass(Tarif);
