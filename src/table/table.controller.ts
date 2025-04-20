import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './tableDto/createTabelDto';
import { Table } from './table.schema';
import { UpdateTableDto } from './tableDto/updateTableDto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) { }
  @Post('create')
  async createTable(@Body() dto: CreateTableDto): Promise<{ message: string, table: Table }> {
    return this.tableService.createTable(dto)
  }
  @Get('getAllTable')
  async getAllTable(): Promise<{ message: string, table: Table[] }> {
    return this.tableService.getAllTable()
  }
  @Get('getOnetable/:id')
  async getOneTable(@Param('id') id: string): Promise<Table> {
    return this.tableService.getOneTable(id)
  }
  @Put('edit/:id')
  async editTable(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<{ message: string, table: Table }> {
    return this.tableService.updateTable(id, dto)
  }
  @Delete('delete/:id')
  async deleteTable(@Param('id') id: string): Promise<{ message: string }> {
    return this.tableService.deleteTable(id)
  }
}
