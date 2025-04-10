import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './table.schema';

import { createTableDto } from './tableDto/createTabelDto';
import { Model } from 'mongoose';

@Injectable()
export class TableService {
    constructor(@InjectModel(Table.name) private tableModel: Model<Table>) { }

    async createTable(dto: createTableDto): Promise<{ message: string, table: Table }> {
        try {
            const existsTable = await this.tableModel.findOne({ name: dto.name })
            if (existsTable) {
                throw new ConflictException("table already exists");
            }
            const table = await this.tableModel.create(dto)
            return { message: 'succesfully table create', table: table }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("server error");
        }
    }
}
