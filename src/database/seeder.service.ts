// src/database/seeder.ts
import { faker } from '@faker-js/faker';
import { MovieService } from '../movie/movie.service';
import { Logger } from '@nestjs/common';

export async function seedDatabase(movieService: MovieService): Promise<void> {
  const logger = new Logger('Seeder');
  const movies = [
    {
      title: 'The Conversation',
      description: 'A surveillance expert finds himself caught in a web of intrigue and paranoia.',
      imageUrl: faker.image.url(),
      isWinner: false,
    },
    {
      title: 'A Man for All Seasons',
      description: 'The story of Sir Thomas More’s stand against King Henry VIII.',
      imageUrl: faker.image.url(),
      isWinner: true,
    },
    {
      title: 'The Wages of Fear',
      description: 'Four men undertake a deadly journey transporting nitroglycerin through South America.',
      imageUrl: faker.image.url(),
      isWinner: false,
    },
    {
      title: 'Midnight Cowboy',
      description: 'A naive Texan travels to New York to make a fortune but struggles to survive.',
      imageUrl: faker.image.url(),
      isWinner: true,
    },
    {
      title: 'The Night of the Hunter',
      description: 'A sinister preacher hunts two children for hidden money in this psychological thriller.',
      imageUrl: faker.image.url(),
      isWinner: false,
    },
    {
      title: 'The Third Man',
      description: 'A writer investigates the mysterious death of his friend in post-war Vienna.',
      imageUrl: faker.image.url(),
      isWinner: false,
    },
    {
      title: 'The Last Emperor',
      description: 'The epic story of China’s last emperor from his privileged childhood to political exile.',
      imageUrl: faker.image.url(),
      isWinner: true,
    },
    {
      title: 'McCabe & Mrs. Miller',
      description: 'A gambler and a prostitute form an uneasy partnership in a growing frontier town.',
      imageUrl: faker.image.url(),
      isWinner: false,
    },
    {
      title: 'The Killing of a Sacred Deer',
      description: 'A heart surgeon’s life unravels when a mysterious boy threatens his family.',
      imageUrl: faker.image.url(),
      isWinner: false,
    },
  ];

  logger.log('Seeding database with movies...');
  for (const movie of movies) {
    await movieService.create(movie);
  }
  logger.log('Database seeded successfully!');
}
