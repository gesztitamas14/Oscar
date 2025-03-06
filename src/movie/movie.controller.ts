import { Controller, Get, Post, Body, Put, Delete, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';
import { Logger } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  private readonly logger = new Logger(MovieService.name);
  constructor(private readonly movieService: MovieService) {}

  // GET /movies
  @Get()
  async getAllMovies(@Query() query: any = {}): Promise<Movie[]> {
    return this.movieService.findAll(query);
  }

  // GET /movies/winners
  @Get('winners')
  async getWinners(): Promise<Movie[]> {
    this.logger.log('Reading Oscar winner movies...');
    return this.movieService.findWinners();
  }

  // GET /movies/:id
  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<Movie> {
    this.logger.log(`Reading move with id: ${id}...`);
    return this.movieService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new movie' })
  @ApiResponse({ status: 201, description: 'The movie has been successfully created.' })
  @ApiBody({ type: CreateMovieDto })
  async createMovie(@Body() body: CreateMovieDto): Promise<Movie> {
    this.logger.log('Adding new movie to database...');
    return this.movieService.create(body);
  }

  // PUT /movies/:id
  @Put(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiResponse({ status: 201, description: 'The movie has been successfully updated.' })
  @ApiBody({ type: CreateMovieDto })
  async updateMovie(
    @Param('id') id: string,
    @Body() body: CreateMovieDto,
  ): Promise<Movie> {
    this.logger.log('Updating existing movie...');
    return this.movieService.update(id, body);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<{ message: string }> {
    this.logger.log('Removing movie from database...');
    const deleted = await this.movieService.delete(id);
    if (!deleted) {
      return { message: 'Movie not found' };
    }
    return { message: 'Movie deleted successfully' };
  }

}
