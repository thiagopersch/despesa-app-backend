import { Controller, Get } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
class SessionsController {
  @Get('session')
  public async validate(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    return response.json({ status: 'ok' });
  }
}

export default SessionsController;
