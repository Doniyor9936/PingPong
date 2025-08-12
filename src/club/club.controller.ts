import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Logger 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClubService } from './club.service';
import { CreateClubDto } from './clubDto.ts/createdto';
import { UpdateClubDto } from './clubDto.ts/updateClubDto';
import { Club } from './club.schema';

@ApiTags('Club') // Swagger bo‘lim nomi
@Controller('club')
export class ClubController {
  private readonly logger = new Logger(ClubController.name);

  constructor(private readonly clubService: ClubService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new club' })
  @ApiResponse({ status: 201, description: 'Club successfully created', type: Club })
  @ApiBody({ type: CreateClubDto })
  async createClub(@Body() dto: CreateClubDto): Promise<{ message: string; club: Club }> {
    this.logger.log(`Creating club with data: ${JSON.stringify(dto)}`);
    return this.clubService.createClub(dto);
  }

  @Get('getAllClub')
  @ApiOperation({ summary: 'Get all clubs' })
  @ApiResponse({ status: 200, description: 'List of all clubs', type: [Club] })
  async getAllClub(): Promise<{ message: string; club: Club[] }> {
    this.logger.log(`Fetching all clubs`);
    return this.clubService.getAllClub();
  }

  @Get('getOneClub/:id')
  @ApiOperation({ summary: 'Get one club by ID' })
  @ApiParam({ name: 'id', description: 'Club ID', type: String })
  @ApiResponse({ status: 200, description: 'Club found', type: Club })
  async getOneClub(@Param('id') id: string): Promise<{ message: string; club: Club }> {
    this.logger.log(`Fetching club with id: ${id}`);
    return this.clubService.getOneClub(id);
  }

  @Put('editClub/:id')
  @ApiOperation({ summary: 'Update an existing club' })
  @ApiParam({ name: 'id', description: 'Club ID', type: String })
  @ApiBody({ type: UpdateClubDto })
  @ApiResponse({ status: 200, description: 'Club successfully updated', type: Club })
  async editClub(
    @Param('id') id: string,
    @Body() dto: UpdateClubDto,
  ): Promise<{ message: string; club: Club }> {
    this.logger.log(`Updating club with id: ${id}, data: ${JSON.stringify(dto)}`);
    return this.clubService.updateClub(id, dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a club by ID' })
  @ApiParam({ name: 'id', description: 'Club ID', type: String })
  @ApiResponse({ status: 200, description: 'Club successfully deleted' })
  async deleteClub(@Param('id') id: string): Promise<{ message: string }> {
    this.logger.log(`Deleting club with id: ${id}`);
    return this.clubService.deleteClub(id);
  }
}
