import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 3 * 1024 * 1024 }));
  app.enableCors();
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
