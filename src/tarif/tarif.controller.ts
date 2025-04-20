import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TarifService } from './tarif.service';
import { Tarif } from './tarif.schema';
import { CreateTarifDto } from './tarifDto/create.tarif.dto';
import { UpdateTarifDto } from './tarifDto/update.tarif.dto';

@Controller('tarif')
export class TarifController {
  constructor(private readonly tarifService: TarifService) { }
  @Post('/create')
  async createTarif(@Body() dto: CreateTarifDto): Promise<{ message: string, tarif: Tarif }> {
    console.log('createTarifDto:', dto);
    return this.tarifService.createTarif(dto)
  }
  @Get('/get')
  async getAllTarif(): Promise<{ message: string }> {
    return this.tarifService.getAllTarif()
  }
  @Put('/edit/:id')
  async editTarif(@Param('id') id: string, @Body() dto: UpdateTarifDto): Promise<{ message: string, tarif: Tarif }> {
    return this.tarifService.updateTarif(id, dto)
  }
  @Delete('/delete/:id')
  async deleteTarif(@Param('id') id: string): Promise<{ message: string }> {
    return this.tarifService.deleteTarif(id)
  }
}
