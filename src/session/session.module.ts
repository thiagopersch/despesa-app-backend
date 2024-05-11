import { Module } from '@nestjs/common';
import SessionsController from './session.controller';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionService],
})
export class SessionModule {}
