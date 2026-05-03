import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 👇 simula usuário logado
    req['userId'] = 1;

    next();
  }
}