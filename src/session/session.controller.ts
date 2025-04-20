import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './sessionDto/createSessionDto';
import { Session } from './session.schema';
import { UpdateSessionDto } from './sessionDto/updateSessionDto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }
  @Post('create')
  async createSession(@Body() dto: CreateSessionDto): Promise<{ message: string, session: Session }> {
    return this.sessionService.createSession(dto)
  }
  @Get('get')
  async getAllSession(): Promise<{ message: string, session: Session[] }> {
    return this.sessionService.getAllSession()
  }
  @Put('edit/:id')
  async updateSession(@Param('id') id: string, @Body() dto: UpdateSessionDto): Promise<{ message: string, session: Session }> {
    return this.sessionService.updateSession(id, dto)
  }
  @Delete('delete/:id')
  async deleteSession(@Param('id') id: string): Promise<{ message: string }> {
    return this.sessionService.deleteSession(id)
  }
}
