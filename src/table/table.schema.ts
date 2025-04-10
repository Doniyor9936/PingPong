import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TableDocument = HydratedDocument<Table>;

@Schema()
export class Table {
    @Prop({ required: false, trim: true, minlength: 2, maxlength: 50 })
    name: string;

    @Prop({ required: true, min: 1 })
    number: number;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Club' })
    club: Types.ObjectId;
}

export const TableSchema = SchemaFactory.createForClass(Table);
