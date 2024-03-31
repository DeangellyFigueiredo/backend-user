import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: '*',
    optionsSuccessStatus: 200,
    exposedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Backend User API')
    .setDescription('The Backend User API description')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('INDT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server is running on port http://${process.env.HOST}:${process.env.PORT}`,
    );
    console.log(
      `🤖 swagger running on port http://${process.env.HOST}:${process.env.PORT}/swagger`,
    );
  });
}
bootstrap();
