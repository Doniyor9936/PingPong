import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>
@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    fullName: string

    @Prop({ required: true, type: Date })
    birthDate: Date

    @Prop()
    role: string

    @Prop()
    salary: number

    @Prop({ type: Types.ObjectId, ref: 'Club' })
    club: Types.ObjectId

    @Prop({ required: true })
    phone: string
}
export const UserSchema = SchemaFactory.createForClass(User)