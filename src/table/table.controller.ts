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
import { TableService } from './table.service';
import { CreateTableDto } from './tableDto/createTabelDto';
import { UpdateTableDto } from './tableDto/updateTableDto';
import { Table } from './table.schema';

@ApiTags('Table')
@Controller('table')
export class TableController {
  private readonly logger = new Logger(TableController.name);

  constructor(private readonly tableService: TableService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new table' })
  @ApiBody({ type: CreateTableDto })
  @ApiResponse({ status: 201, description: 'Table successfully created', type: Table })
  async createTable(
    @Body() dto: CreateTableDto,
  ): Promise<{ message: string; table: Table }> {
    this.logger.log(`Creating table: ${JSON.stringify(dto)}`);
    return this.tableService.createTable(dto);
  }

  @Get('getAllTable')
  @ApiOperation({ summary: 'Get all tables' })
  @ApiResponse({ status: 200, description: 'List of all tables', type: [Table] })
  async getAllTable(): Promise<{ message: string; table: Table[] }> {
    this.logger.log(`Fetching all tables`);
    return this.tableService.getAllTable();
  }

  @Get('getOneTable/:id')
  @ApiOperation({ summary: 'Get a table by ID' })
  @ApiParam({ name: 'id', description: 'Table ID', type: String })
  @ApiResponse({ status: 200, description: 'Table found', type: Table })
  async getOneTable(@Param('id') id: string): Promise<Table> {
    this.logger.log(`Fetching table with id: ${id}`);
    return this.tableService.getOneTable(id);
  }

  @Put('edit/:id')
  @ApiOperation({ summary: 'Update an existing table' })
  @ApiParam({ name: 'id', description: 'Table ID', type: String })
  @ApiBody({ type: UpdateTableDto })
  @ApiResponse({ status: 200, description: 'Table successfully updated', type: Table })
  async editTable(
    @Param('id') id: string,
    @Body() dto: UpdateTableDto,
  ): Promise<{ message: string; table: Table }> {
    this.logger.log(`Updating table with id: ${id}, data: ${JSON.stringify(dto)}`);
    return this.tableService.updateTable(id, dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a table by ID' })
  @ApiParam({ name: 'id', description: 'Table ID', type: String })
  @ApiResponse({ status: 200, description: 'Table successfully deleted' })
  async deleteTable(@Param('id') id: string): Promise<{ message: string }> {
    this.logger.log(`Deleting table with id: ${id}`);
    return this.tableService.deleteTable(id);
  }
}
