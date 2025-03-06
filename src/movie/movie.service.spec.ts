import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';

const movieArray = [
  {
    title: 'Oppenheimer',
    description: 'A biopic about J. Robert Oppenheimer',
    imageUrl: 'https://example.com/oppenheimer.jpg',
    isWinner: true,
  },
  {
    title: 'Barbie',
    description: 'A movie about Barbie',
    imageUrl: 'https://example.com/barbie.jpg',
    isWinner: false,
  },
];

// Create a mock class for the Mongoose model with chainable methods
class MockMovieModel {
  movieData: any;
  constructor(movieData) {
    this.movieData = movieData;
  }
  save() {
    return Promise.resolve(this.movieData);
  }

  static find(filter?: any) {
    return {
      sort: (sortOption: any) => {
        return {
          exec: jest.fn().mockResolvedValue(movieArray),
        };
      },
    };
  }

  static findById(id: string) {
    return { exec: jest.fn().mockResolvedValue(movieArray[0]) };
  }

  static findByIdAndUpdate(id: string, update: any, options: any) {
    return { exec: jest.fn().mockResolvedValue({ ...movieArray[0], ...update }) };
  }

  static findByIdAndDelete(id: string) {
    return { exec: jest.fn().mockResolvedValue(movieArray[0]) };
  }

  static countDocuments(filter?: any) {
    return { exec: jest.fn().mockResolvedValue(movieArray.length) };
  }
}

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie.name),
          useValue: MockMovieModel,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of movies', async () => {
    const movies = await service.findAll();
    expect(movies).toEqual(movieArray);
  });

  it('should return one movie by id', async () => {
    const movie = await service.findOne('anyId');
    expect(movie).toEqual(movieArray[0]);
  });

  it('should create a new movie', async () => {
    const movieData: CreateMovieDto = {
      title: 'Dune: Part Two',
      description: 'Epic continuation of the saga',
      imageUrl: 'https://example.com/dune2.jpg',
      isWinner: false,
    };
    const newMovie = await service.create(movieData);
    expect(newMovie).toEqual(movieData);
  });

  it('should update a movie', async () => {
    const updatedMovie = await service.update('anyId', { isWinner: true });
    expect(updatedMovie).toEqual({ ...movieArray[0], isWinner: true });
  });

  it('should delete a movie', async () => {
    const result = await service.delete('anyId');
    expect(result).toBe(true);
  });

  it('should count all movies', async () => {
    const count = await service.countAllMovies();
    expect(count).toEqual(movieArray.length);
  });
});
