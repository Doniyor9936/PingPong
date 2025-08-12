import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tarif } from "./tarif.schema";
import { CreateTarifDto } from "./tarifDto/create.tarif.dto";
import { Model } from "mongoose";
import { UpdateTarifDto } from "./tarifDto/update.tarif.dto";
import { after } from "node:test";

@Injectable()
export class TarifService {
  constructor(@InjectModel(Tarif.name) private tarifModel: Model<Tarif>) {}

  async createTarif(dto: CreateTarifDto): Promise<{ message: string; tarif: Tarif }> {
    try {
      const existsTarif = await this.tarifModel.findOne({ name: dto.name });
      if (existsTarif) {
        throw new ConflictException("bunday tarif mavjud");
      }
      const tarif = await this.tarifModel.create({ ...dto });
      return { message: "tarif yaratildi", tarif: tarif };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException("server error");
    }
  }
  async getAllTarif(): Promise<{ message: string; tarif: Tarif[] }> {
    try {
      const existsTarif = await this.tarifModel.find();
      if (!existsTarif) {
        throw new NotFoundException("tarif not found");
      }
      return { message: "all tariffs", tarif: existsTarif };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw NotFoundException;
      }
      throw new InternalServerErrorException("server error");
    }
  }
  async updateTarif(id: string, dto: UpdateTarifDto): Promise<{ message: string; tarif: Tarif }> {
    try {
      const existsTarif = await this.tarifModel.findByIdAndUpdate(id, dto, { new: true });
      if (!existsTarif) {
        throw new NotFoundException("tarif not found");
      }
      return { message: "update succes tarif", tarif: existsTarif };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw NotFoundException;
      }
      throw new InternalServerErrorException("server error");
    }
  }
  async deleteTarif(id: string): Promise<{ message: string }> {
    try {
      const existsTarif = await this.tarifModel.findByIdAndDelete(id);
      if (!existsTarif) {
        throw new NotFoundException("tarif not found");
      }
      return { message: "succes delete" };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw NotFoundException;
      }
      throw new InternalServerErrorException("server error");
    }
  }
}
