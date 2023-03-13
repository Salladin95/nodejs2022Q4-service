import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';
import { ConfigEnum, ManualConfigOptions } from './configs';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  const manualConfig = configService.get<ManualConfigOptions>(
    ConfigEnum.MANUAL,
  );

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription('The REST Service API description')
    .setVersion('1.0')
    .addServer(manualConfig.baseURL)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(manualConfig.port);
  console.log(`Server is running on port: ${manualConfig.port}`);
}

bootstrap();
