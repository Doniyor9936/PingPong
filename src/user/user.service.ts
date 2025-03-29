import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as nodemailer from "nodemailer"
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './userDto/create.user.dto';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './userDto/login.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userSchema: Model<UserDocument>, private emailService: EmailService) { }

    async register(dto: CreateUserDto) {
        const { email, password, fullName, birthDate, role, salary, phone } = dto
        const hashPassword = await bcrypt.hash(password, 8);
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const newUser = await this.userSchema.create({ email, password: hashPassword, fullName, birthDate, role, salary, phone, verificationCode })

        await this.emailService.sendVerificationCode(email, verificationCode)
        return { message: "created new user", user: newUser }
    }
    async login(dto: LoginUserDto) {
        const { email, password } = dto
        if (!email || !password) {
            throw new UnauthorizedException("notogri email yoki parol");
        }
        return `succes logged system `
    }
}
