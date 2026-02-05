import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Olá');

    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Renan',
        sobrenome: 'Junior',
        role: 'user',
      };
    }

    res.setHeader('CABECALHO', 'Do Middleware');

    res.on('finish', () => {
      // Essa função verifica o estado da conexão, neste caso quando finalizar a conexão ele vai executar a função
      console.log('SimpleMiddleware: terminou');
    });

    next();

    console.log('SimpleMiddleware: Tchau'); // Vai ser executado depois do fluxo a diante
  }
}
