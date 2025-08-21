import { NestFactory } from '@nestjs/core';   
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'tsconfig-paths/register';

// Solo importar tsconfig-paths/register en desarrollo
if (process.env.NODE_ENV !== 'production') {
  require('tsconfig-paths/register');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cors
  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API documentation for the application')
  .setVersion('1.0')
  .addServer('http://localhost:3000', 'Development Server')
  .addTag('Backend of NestJS')
  .addBearerAuth()
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
