import { ModCategory } from '@prisma/client'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateModDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0.01)
  price!: number;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

  @IsEnum(ModCategory)
  category!: ModCategory;
}