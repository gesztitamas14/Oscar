import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MovieService } from './movie/movie.service';
import { seedDatabase } from './database/seeder.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Oscar API')
    .setDescription('API for Oscar winners & nominees')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const movieService = app.get(MovieService);

  // Check if the database is empty
  const count = await movieService.countAllMovies();
  if (count === 0) {
    logger.log('Database is empty. Seeding data...');
    await seedDatabase(movieService);
  } else {
    logger.log('Database already contains data. Skipping seeding.');
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
