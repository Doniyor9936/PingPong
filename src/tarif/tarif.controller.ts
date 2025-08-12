import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put 
} from '@nestjs/common';
import { TarifService } from './tarif.service';
import { Tarif } from './tarif.schema';
import { CreateTarifDto } from './tarifDto/create.tarif.dto';
import { UpdateTarifDto } from './tarifDto/update.tarif.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('tarif')
@Controller('tarif')
export class TarifController {
  constructor(private readonly tarifService: TarifService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new tarif' })
  @ApiResponse({ status: 201, description: 'Tarif successfully created.', type: Tarif })
  async createTarif(
    @Body() dto: CreateTarifDto
  ): Promise<{ message: string; tarif: Tarif }> {
    console.log('createTarifDto:', dto);
    return this.tarifService.createTarif(dto);
  }

  @Get('/get')
  @ApiOperation({ summary: 'Get all tarifs' })
  @ApiResponse({ status: 200, description: 'List of tarifs.', type: [Tarif] })
  async getAllTarif(): Promise<{ message: string; tarifs?: Tarif[] }> {
    return this.tarifService.getAllTarif();
  }

  @Put('/edit/:id')
  @ApiOperation({ summary: 'Update a tarif by ID' })
  @ApiParam({ name: 'id', description: 'Tarif ID' })
  @ApiResponse({ status: 200, description: 'Tarif successfully updated.', type: Tarif })
  async editTarif(
    @Param('id') id: string,
    @Body() dto: UpdateTarifDto
  ): Promise<{ message: string; tarif: Tarif }> {
    return this.tarifService.updateTarif(id, dto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a tarif by ID' })
  @ApiParam({ name: 'id', description: 'Tarif ID' })
  @ApiResponse({ status: 200, description: 'Tarif successfully deleted.' })
  async deleteTarif(@Param('id') id: string): Promise<{ message: string }> {
    return this.tarifService.deleteTarif(id);
  }
}
