import { Module } from '@nestjs/common';

import { ClubModule } from './club/club.module';
import { TableModule } from './table/table.module';
import { TarifModule } from './tarif/tarif.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  MongooseModule.forRoot(process.env.DB_URI as string),
    ClubModule, TableModule, TarifModule, UserModule, SessionModule, EmailModule],

})
export class AppModule { }

////// OTpaI7ihrxcZelZ8
