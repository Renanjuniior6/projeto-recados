import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(() => {
        // tap -> Realiza algo no final da execução da requisição e é possível pegar os dados da resposta também passando o 'data' como argumento
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
        console.log(
          `TimingConnectionInterceptor: Levou ${elapsedTime}ms para executar`,
        );
      }),
    );
  }
}
