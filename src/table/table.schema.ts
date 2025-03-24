import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TableDocument = HydratedDocument<Table>;

@Schema()
export class Table {
    @Prop()
    name: string;

    @Prop({ required: true })
    number: number;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Club' })
    club: Types.ObjectId;
}

export const TableSchema = SchemaFactory.createForClass(Table);
