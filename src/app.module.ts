import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { SimpleMiddleware } from './common/middlewares/simple-middleware';
import { AnotherMiddleware } from './common/middlewares/another-middleware';
import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from './common/filters/my-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app_db',
      autoLoadEntities: true,
      synchronize: true, // Não deve ser usado em produção, pois sincroniza TUDO com a base de dados
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  // Configurando o middlware na aplicação
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*', // As rotas em que o middleware vai verificar (neste caso todas as rotas '*')
      method: RequestMethod.ALL,
    });
    consumer.apply(AnotherMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
