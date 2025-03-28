import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>
@Schema()
export class User {

    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ required: true, minlength: 3, maxlength: 50 })
    fullName: string;

    @Prop({ required: true, type: Date })
    birthDate: Date;

    @Prop({ enum: ['admin', 'user', 'moderator'], default: 'user' })
    role: string;

    @Prop({ min: 0 })
    salary: number;

    @Prop({ type: Types.ObjectId, ref: 'Club' })
    club: Types.ObjectId;

    @Prop({ required: true, match: /^[0-9]{9,15}$/ })
    phone: string;

}
export const UserSchema = SchemaFactory.createForClass(User)