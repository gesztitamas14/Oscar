import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { NestFactory } from '@nestjs/core';
import { MovieService } from '../movie/movie.service';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';

// For manual database seeding

async function seedDatabase() {
  if (!process.env.MONGO_URI) {
    console.error('ERROR: MONGO_URI is not defined. Check your .env file.');
    process.exit(1);
  }
  const logger = new Logger('ManualSeeder');
  const app = await NestFactory.createApplicationContext(AppModule);
  const movieService = app.get(MovieService);

  logger.log('Seeding database with movies...');

  const movies = [
    { title: 'Oppenheimer', description: 'A biopic about J. Robert Oppenheimer.', imageUrl: faker.image.url(), isWinner: true },
    { title: 'Barbie', description: 'A comedy about Barbie\'s adventures.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'Poor Things', description: 'A surreal fantasy film.', imageUrl: faker.image.url(), isWinner: true },
    { title: 'The Holdovers', description: 'A comedy-drama about a teacher and a student stuck together.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'The Conversation', description: 'A surveillance expert finds himself caught in a web of intrigue and paranoia.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'A Man for All Seasons', description: 'The story of Sir Thomas More\'s stand against King Henry VIII.', imageUrl: faker.image.url(), isWinner: true },
    { title: 'The Wages of Fear', description: 'Four men undertake a deadly journey transporting nitroglycerin through South America.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'The Sweet Smell of Success', description: 'A ruthless newspaper columnist and a desperate press agent navigate the dark world of New York media.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'Midnight Cowboy', description: 'A naive Texan travels to New York to make a fortune but struggles to survive.', imageUrl: faker.image.url(), isWinner: true },
    { title: 'The Night of the Hunter', description: 'A sinister preacher hunts two children for hidden money in this psychological thriller.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'The Third Man', description: 'A writer investigates the mysterious death of his friend in post-war Vienna.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'The Last Emperor', description: 'The epic story of China\'s last emperor from his privileged childhood to political exile.', imageUrl: faker.image.url(), isWinner: true },
    { title: 'McCabe & Mrs. Miller', description: 'A gambler and a prostitute form an uneasy partnership in a growing frontier town.', imageUrl: faker.image.url(), isWinner: false },
    { title: 'The Killing of a Sacred Deer', description: 'A heart surgeon\'s life unravels when a mysterious boy threatens his family.', imageUrl: faker.image.url(), isWinner: false }
  ];

  for (const movie of movies) {
    await movieService.create(movie);
  }

  logger.log('Database seeded successfully!');
  process.exit();
}


seedDatabase();