import { ModCategory } from '@prisma/client'
import {
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateModDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsEnum(ModCategory)
  category: ModCategory;
}