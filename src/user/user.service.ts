import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './userDto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './userDto/login.user.dto';
import { UpdateUserDto } from './userDto/update.user.dto';
import { v4 as uuid4 } from 'uuid';
import { sendEmail } from 'src/util/email.service';
import { comparePassword, generateHashPassword } from 'src/util/password.service';
import { generateToken } from 'src/util/token.service';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userSchema: Model<UserDocument>) { }

    private generateOtpExpireTime(): Date {
        const otpExpireTime = new Date()
        otpExpireTime.setMinutes(otpExpireTime.getMinutes() + 10)
        return otpExpireTime
    }
    private async setOtp(email: string): Promise<string> {
        const otp = uuid4()
        const message = `Click on the link to verify your account: http://localhost:${process.env.PORT}/user/verify/${otp}`;
        await sendEmail(email, "Verify your account", message)
        return otp
    }

    async register(dto: CreateUserDto) {
        try {
            const existUser = await this.userSchema.findOne({ email: dto.email })
            if (existUser) {
                throw new ConflictException("User already exists");
            }
            dto.password = await generateHashPassword(dto.password)
            const otpExpireTime = await this.generateOtpExpireTime()
            const otp = await this.setOtp(dto.email)

            const newUser = await this.userSchema.create({ ...dto, otpExpireDate: otpExpireTime, otp: otp })
            return { message: "created new user", user: newUser }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async login(dto: LoginUserDto) {
        try {
            const { email, password } = dto
            const user = await this.userSchema.findOne({ email })
            if (!user) {
                throw new NotFoundException("user not found");
            }
            const isMatch = await comparePassword(password, user.password)
            if (!isMatch) {
                throw new UnauthorizedException("notogri email yoki parol");
            }
            const payload = { _id: user._id, email: user.email, role: user.role }
            const accessToken = await generateToken(payload)
            const refreshToken = jwt.sign(payload, 'secret', { expiresIn: '10d' })
            return { message: `succes logged system`, accessToken, refreshToken }
        } catch (error) {
            console.error(error.message);
            throw new InternalServerErrorException("server error");
        }
    }
    async updateUser(_id: string, dto: UpdateUserDto) {
        const existUser = await this.userSchema.findByIdAndUpdate(_id, dto, { new: true })
        if (!existUser) {
            throw new NotFoundException("user not found");
        }
        return { message: `update succes`, user: existUser }
    }
    async deleteUser(_id) {
        const existUser = await this.userSchema.findByIdAndDelete(_id)
        if (!existUser) {
            throw new NotFoundException("user not found");
        }
        return { message: `${_id} succes delete` }
    }
    async getAllUser() {
        const existUser = await this.userSchema.find()
        if (!existUser) {
            throw new NotFoundException("Users not found");
        }
        return existUser
    }
    async getOneUser(_id) {
        const existUser = await this.userSchema.findOne({ _id })
        if (!existUser) {
            throw new NotFoundException("User not found");
        }
        return existUser
    }

    async verifyUser(otp: string) {
        try {
            const user = await this.userSchema.findOne({ otp })

            if (!user) throw new NotFoundException("user not found")

            user.isVerified = true
            await user.save()

            return { message: "user verified" }
        } catch (error) {
            throw new InternalServerErrorException("server error")
        }
    }
}
