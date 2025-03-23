import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubModule } from './club/club.module';
import { TableModule } from './table/table.module';
import { TarifModule } from './tarif/tarif.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [ClubModule, TableModule, TarifModule, UserModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
