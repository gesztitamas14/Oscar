import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

const mockMovieService = {
  findAll: jest.fn().mockResolvedValue([{ title: 'Movie 1', description: 'Desc 1', imageUrl: 'https://example.com/1.jpg', isWinner: true }]),
  findWinners: jest.fn().mockResolvedValue([{ title: 'Winner Movie', description: 'Desc Winner', imageUrl: 'https://example.com/winner.jpg', isWinner: true }]),
  findOne: jest.fn().mockResolvedValue({ title: 'Movie 1', description: 'Desc 1', imageUrl: 'https://example.com/1.jpg', isWinner: true }),
  create: jest.fn().mockResolvedValue({ title: 'Created Movie', description: 'Created Desc', imageUrl: 'https://example.com/created.jpg', isWinner: false }),
  update: jest.fn().mockResolvedValue({ title: 'Updated Movie', description: 'Updated Desc', imageUrl: 'https://example.com/updated.jpg', isWinner: true }),
  delete: jest.fn().mockResolvedValue(true),
};

describe('MovieController', () => {
  let controller: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /movies', () => {
    it('should return an array of movies', async () => {
      const result = await controller.getAllMovies({});
      expect(result).toEqual([{ title: 'Movie 1', description: 'Desc 1', imageUrl: 'https://example.com/1.jpg', isWinner: true }]);
      expect(movieService.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('GET /movies/winners', () => {
    it('should return an array of winner movies', async () => {
      const result = await controller.getWinners();
      expect(result).toEqual([{ title: 'Winner Movie', description: 'Desc Winner', imageUrl: 'https://example.com/winner.jpg', isWinner: true }]);
      expect(movieService.findWinners).toHaveBeenCalled();
    });
  });

  describe('GET /movies/:id', () => {
    it('should return one movie by id', async () => {
      const result = await controller.getMovie('someId');
      expect(result).toEqual({ title: 'Movie 1', description: 'Desc 1', imageUrl: 'https://example.com/1.jpg', isWinner: true });
      expect(movieService.findOne).toHaveBeenCalledWith('someId');
    });
  });

  describe('POST /movies', () => {
    it('should create a new movie', async () => {
      const createDto: CreateMovieDto = {
        title: 'New Movie',
        description: 'New Description',
        imageUrl: 'https://example.com/new.jpg',
        isWinner: false,
      };
      const result = await controller.createMovie(createDto);
      expect(result).toEqual({ title: 'Created Movie', description: 'Created Desc', imageUrl: 'https://example.com/created.jpg', isWinner: false });
      expect(movieService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('PUT /movies/:id', () => {
    it('should update a movie', async () => {
      const updateDto: CreateMovieDto = {
        title: 'Updated Movie',
        description: 'Updated Desc',
        imageUrl: 'https://example.com/updated.jpg',
        isWinner: true,
      };
      const result = await controller.updateMovie('someId', updateDto);
      expect(result).toEqual({ title: 'Updated Movie', description: 'Updated Desc', imageUrl: 'https://example.com/updated.jpg', isWinner: true });
      expect(movieService.update).toHaveBeenCalledWith('someId', updateDto);
    });
  });

  describe('DELETE /movies/:id', () => {
    it('should delete a movie and return success message', async () => {
      const result = await controller.deleteMovie('someId');
      expect(result).toEqual({ message: 'Movie deleted successfully' });
      expect(movieService.delete).toHaveBeenCalledWith('someId');
    });

    it('should return not found message if deletion fails', async () => {
      mockMovieService.delete.mockResolvedValueOnce(false);
      const result = await controller.deleteMovie('someId');
      expect(result).toEqual({ message: 'Movie not found' });
      expect(movieService.delete).toHaveBeenCalledWith('someId');
    });
  });
});
