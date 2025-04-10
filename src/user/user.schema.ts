import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, HydratedDocument, Types } from "mongoose";

export enum UserRoles {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
    USER = 'user',
}

export const AllUserRoles = [UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER]

export type UserDocument = HydratedDocument<User>
@Schema()
export class User {

    @Prop({ required: true, unique: true, trim: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ required: true, minlength: 3, maxlength: 50 })
    fullName: string;

    @Prop({ required: true, type: Date })
    birthDate: Date;

    @Prop({ required: true, enum: AllUserRoles, default: UserRoles.USER })
    role: string;

    @Prop({ required: true})
    phone: string;

    @Prop({ required: true, default: false })
    isVerified: boolean;

    @Prop({ required: true, default: null })
    otp?: string

    @Prop({ required: true, type: Date })
    otpExpireDate: Date
}
export const UserSchema = SchemaFactory.createForClass(User)