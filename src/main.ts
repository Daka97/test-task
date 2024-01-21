import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Test Task')
    .setDescription('Test test swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('example') // Optional: Add tags for grouping
    .build();

  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

	app.use(cookieParser());
  await app.listen(3000, () =>
  console.log(`Rout server launched on host: localhost//:3000`)
);
}

bootstrap();
