import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.schema';
import { Model } from 'mongoose';
import { CreateSessionDto } from './sessionDto/createSessionDto';
import { table } from 'console';
import { UpdateSessionDto } from './sessionDto/updateSessionDto';

@Injectable()
export class SessionService {
    constructor(@InjectModel(Session.name) private sessionService: Model<Session>) { }

    async createSession(dto: CreateSessionDto): Promise<{ message: string, session: Session }> {
        try {
            const existsSession = await this.sessionService.findOne({ table: dto.table, endDate: null })
            if (existsSession) {
                throw new ConflictException("bu stol hozir band");
            }
            const session = await this.sessionService.create(dto)
            return { message: 'sessiya yaratildi', session }
        } catch (error) {
            console.error('Sessiya yaratishda xatolik:', error);
            throw new InternalServerErrorException("server error");
        }
    }
    async getAllSession(): Promise<{ message: string, session: Session[] }> {
        try {
            const existsSession = await this.sessionService.find()
            if (!existsSession) {
                throw new NotFoundException("sessiya mavjud emas");
            }
            return { message: 'hamma sessiyalar', session: existsSession }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async updateSession(id: string, dto: UpdateSessionDto): Promise<{ message: string, session: Session }> {
        try {
            const existsSession = await this.sessionService.findByIdAndUpdate(id, dto, { new: true })
            if (!existsSession) {
                throw new NotFoundException("sessiya topilmadi");
            }
            await existsSession.save()
            return { message: 'sessiya yangilandi', session: existsSession }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
    async deleteSession(id: string): Promise<{ message: string }> {
        try {
            const existsSession = await this.sessionService.findByIdAndDelete(id)
            if (!existsSession) {
                throw new NotFoundException("sessiya topilmadi");
            }
            return { message: 'sessiya ochirildi' }
        } catch (error) {
            throw new InternalServerErrorException("server error");
        }
    }
}
