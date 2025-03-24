import { Module } from '@nestjs/common';
import { TarifService } from './tarif.service';
import { TarifController } from './tarif.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarif, TarifSchema } from './tarif.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tarif.name, schema: TarifSchema }])],
  controllers: [TarifController],
  providers: [TarifService],
})
export class TarifModule { }
