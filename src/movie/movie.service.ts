import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async findAll(query: { search?: string; sort?: string } = {}): Promise<Movie[]> {
    const filter = query.search ? { title: new RegExp(query.search, 'i') } : {};
    const sortOption =
      query.sort === 'title'
        ? { title: 1 }
        : query.sort === 'isWinner'
        ? { isWinner: -1 }
        : {};
  
    return this.movieModel.find(filter).sort(sortOption as any).exec();
  }
  

  async findWinners(): Promise<Movie[]> {
    return this.movieModel.find({ isWinner: true }).exec();
  }

  async countAllMovies(): Promise<number> {
    return this.movieModel.countDocuments().exec();
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec() as any;
  }

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const newMovie = new this.movieModel(movieData);
    return newMovie.save();
  }

  async update(id: string, movieData: Partial<Movie>): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, movieData, { new: true }).exec() as any;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.movieModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
