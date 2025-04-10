import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Club, ClubDocument } from './club.schema';
import { CreateClubDto } from './clubDto.ts/createdto';
import { Model } from 'mongoose';
import { UpdateClubDto } from './clubDto.ts/updateClubDto';

@Injectable()
export class ClubService {
    constructor(@InjectModel(Club.name) private clubSchema: Model<ClubDocument>) { }

    async createClub(dto: CreateClubDto): Promise<{ message: string, club: Club }> {
        const club = await this.clubSchema.create(dto)
        return { message: 'club success create', club: club }
    }
    async getAllClub(): Promise<{ message: string, club: Club[] }> {
        const existsClub = await this.clubSchema.find()
        if (!existsClub) {
            throw new NotFoundException("club not found");
        }
        return { message: 'clubs', club: existsClub }
    }
    async updateClub(id: string, dto: UpdateClubDto): Promise<{ message: string, club: Club }> {
        const existsClub = await this.clubSchema.findByIdAndUpdate(id, dto, { new: true })
        if (!existsClub) {
            throw new NotFoundException("club not found");
        }
        return { message: 'update club', club: existsClub }
    }
    async deleteClub(id: string): Promise<{ message: string }> {
        const existsClub = await this.clubSchema.findByIdAndDelete(id)
        if (!existsClub) {
            throw new NotFoundException("club not found");
        }
        return { message: 'succes club delete' }
    }
}