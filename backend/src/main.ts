import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';
import helmet from 'helmet';
import  comporession from 'compression'
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');


  app.use(helmet());
  app.use(comporession()); 

 
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });


  app.useGlobalFilters(new HttpExceptionFilter());


  app.useWebSocketAdapter(new WsAdapter(app));


  const config = new DocumentBuilder()
    .setTitle('Stock Monitor API')
    .setDescription('API для мониторинга биржевых котировок')
    .setVersion('1.0')
    .addTag('stocks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    logger.log(`🚀 Server started on http://localhost:${PORT}`);
    logger.log(`📊 Swagger UI available at http://localhost:${PORT}/api`);
  });
}

bootstrap();
