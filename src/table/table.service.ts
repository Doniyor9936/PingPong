import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './table.schema';
import { CreateTableDto } from './tableDto/createTabelDto';
import { Model } from 'mongoose';
import { UpdateTableDto } from './tableDto/updateTableDto';

@Injectable()
export class TableService {
    constructor(@InjectModel(Table.name) private tableModel: Model<Table>) { }

    async createTable(dto: CreateTableDto): Promise<{ message: string, table: Table }> {
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
    async getAllTable(): Promise<{ message: string, table: Table[] }> {
        try {
            const existsTable = await this.tableModel.find()
            if (!existsTable) {
                throw new NotFoundException("table not found");
            }
            return { message: 'tables', table: existsTable }
        } catch (error) {
            throw new InternalServerErrorException("server error");

        }
    }
    async getOneTable(id: string): Promise<Table> {
        try {
            const existsTable = await this.tableModel.findById(id)
            if (!existsTable) {
                throw new NotFoundException("table not found");
            }
            return existsTable
        } catch (error) {
            throw new Error("server error");

        }
    }
    async updateTable(id: string, dto: UpdateTableDto): Promise<{ message: string, table: Table }> {
        try {
            const table = await this.tableModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true })
            if (!table) {
                throw new NotFoundException("table not found");
            }
            return { message: 'table succes update', table: table }
        } catch (error) {
            throw new InternalServerErrorException("server error");

        }
    }
    async deleteTable(id: string): Promise<{ message: string }> {
        try {
            const table = await this.tableModel.findByIdAndDelete(id)
            if (!table) {
                throw new NotFoundException("table not found");
            }
            return { message: 'succesfully delete table' }
        } catch (error) {
            throw new InternalServerErrorException("server error");

        }
    }
}
