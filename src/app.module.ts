import { Module } from '@nestjs/common';

import { ClubModule } from './club/club.module';
import { TableModule } from './table/table.module';
import { TarifModule } from './tarif/tarif.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  MongooseModule.forRoot(process.env.DB_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as MongooseModuleOptions),
    ClubModule, TableModule, TarifModule, UserModule, SessionModule],

})
export class AppModule { }


