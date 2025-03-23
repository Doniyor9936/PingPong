import { Module } from '@nestjs/common';
import { TarifService } from './tarif.service';
import { TarifController } from './tarif.controller';

@Module({
  controllers: [TarifController],
  providers: [TarifService],
})
export class TarifModule {}
