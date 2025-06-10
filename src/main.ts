import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Iron school')
    .setDescription('The iron school RestFulAPI')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableCors({
    origin: '*', // TODO
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

// @ts-expect-error (Fix of: <TypeError: Do not know how to serialize a BigInt>)
BigInt.prototype.toJSON = function () {
  return this.toString();
};
bootstrap();
