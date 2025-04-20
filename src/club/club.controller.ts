import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './clubDto.ts/createdto';
import { Club } from './club.schema';
import { UpdateClubDto } from './clubDto.ts/updateClubDto';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) { }
  @Post('create')
  async createClub(@Body() dto: CreateClubDto): Promise<{ message: string, club: Club }> {
    return this.clubService.createClub(dto)
  }
  @Get('getAllClub')
  async getAllClub(): Promise<{ message: string, club: Club[] }> {
    return this.clubService.getAllClub()
  }
  @Get('getOneClub/:id')
  async getOneClub(@Param('id') id: string): Promise<{ message: string, club: Club }> {
    return this.clubService.getOneClub(id)
  }
  @Put('editClub/:id')
  async editClub(@Param('id') id: string, @Body() dto: UpdateClubDto): Promise<{ message: string, club: Club }> {
    return this.clubService.updateClub(id, dto)
  }
  @Delete('delete/:id')
  async deleteClub(@Param('id') id: string): Promise<{ message: string }> {
    return this.clubService.deleteClub(id)
  }
}
