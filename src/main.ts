import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import configuration from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfig = configuration();

  // const config = new DocumentBuilder()
  //   .setTitle('REST Service')
  //   .setDescription('The REST Service API description')
  //   .setVersion('1.0')
  //   .addServer(envConfig.baseURL)
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);

  await app.listen(envConfig.port);
}
bootstrap();
