import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MonthsModule } from './months/months.module';
import { PrismaModule } from './prisma/prisma.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { YearModule } from './year/year.module';

@Module({
  imports: [
    UsersModule,
    YearModule,
    MonthsModule,
    PrismaClient,
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
