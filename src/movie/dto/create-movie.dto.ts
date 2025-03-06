import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

// This is for the swagger's UI (localhost)
export class CreateMovieDto {
  @ApiProperty({ description: 'Title of the movie' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the movie', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'URL of the movie poster', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: 'Flag to indicate if the movie is an Oscar winner', default: false })
  @IsOptional()
  @IsBoolean()
  isWinner?: boolean;
}
