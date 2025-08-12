import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put 
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './sessionDto/createSessionDto';
import { UpdateSessionDto } from './sessionDto/updateSessionDto';
import { Session } from './session.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new session' })
  @ApiResponse({ status: 201, description: 'Session successfully created.', type: Session })
  async createSession(
    @Body() dto: CreateSessionDto
  ): Promise<{ message: string; session: Session }> {
    return this.sessionService.createSession(dto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiResponse({ status: 200, description: 'List of sessions.', type: [Session] })
  async getAllSession(): Promise<{ message: string; session: Session[] }> {
    return this.sessionService.getAllSession();
  }

  @Put('edit/:id')
  @ApiOperation({ summary: 'Update a session by ID' })
  @ApiParam({ name: 'id', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Session successfully updated.', type: Session })
  async updateSession(
    @Param('id') id: string,
    @Body() dto: UpdateSessionDto
  ): Promise<{ message: string; session: Session }> {
    return this.sessionService.updateSession(id, dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a session by ID' })
  @ApiParam({ name: 'id', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Session successfully deleted.' })
  async deleteSession(@Param('id') id: string): Promise<{ message: string }> {
    return this.sessionService.deleteSession(id);
  }
}
