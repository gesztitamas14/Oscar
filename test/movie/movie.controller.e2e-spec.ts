import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let createdMovieId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /movies - should create a new movie', async () => {
    const movieData = {
      title: 'Test Movie',
      description: 'Test Description',
      imageUrl: 'http://example.com/test.jpg',
      isWinner: false,
    };

    const response = await request(app.getHttpServer())
      .post('/movies')
      .send(movieData)
      .expect(201);

    expect(response.body).toMatchObject(movieData);
    expect(response.body._id).toBeDefined();
    createdMovieId = response.body._id;
  });

  it('GET /movies - should return an array with the created movie', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: createdMovieId, title: 'Test Movie' }),
      ]),
    );
  });

  it('GET /movies/:id - should return the created movie', async () => {
    const response = await request(app.getHttpServer())
      .get(`/movies/${createdMovieId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: createdMovieId,
      title: 'Test Movie',
      description: 'Test Description',
      imageUrl: 'http://example.com/test.jpg',
      isWinner: false,
    });
  });

  it('PUT /movies/:id - should update the movie', async () => {
    const updateData = { title: 'Updated Test Movie', isWinner: true };

    const response = await request(app.getHttpServer())
      .put(`/movies/${createdMovieId}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toMatchObject({
      _id: createdMovieId,
      title: 'Updated Test Movie',
      isWinner: true,
    });
  });

  it('DELETE /movies/:id - should delete the movie', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/movies/${createdMovieId}`)
      .expect(200);

    expect(response.body).toEqual({ message: 'Movie deleted successfully' });
  });

  afterAll(async () => {
    await app.close();
  });
});
