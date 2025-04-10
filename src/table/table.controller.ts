import { Body, Controller, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { createTableDto } from './tableDto/createTabelDto';
import { Table } from './table.schema';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) { }
  @Post('create')
  async createTable(@Body() dto: createTableDto): Promise<{ message: string, table: Table }> {
    return this.tableService.createTable(dto)
  }
}
