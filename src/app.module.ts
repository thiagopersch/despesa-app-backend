import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MonthsModule } from './months/months.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { PrismaModule } from './prisma/prisma.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { YearsModule } from './years/years.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UsersModule,
    MonthsModule,
    PrismaClient,
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    AuthModule,
    SessionModule,
    CategoriesModule,
    PrioritiesModule,
    PaymentMethodsModule,
    YearsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
