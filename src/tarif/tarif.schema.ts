import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TarifDocument = HydratedDocument<Tarif>;

@Schema()
export class Tarif {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    pricePerHour: number;

    @Prop()
    rackets: string[];

    @Prop({ required: true, type: Types.ObjectId, ref: 'Club' })
    club: Types.ObjectId;
}

export const TarifSchema = SchemaFactory.createForClass(Tarif);
