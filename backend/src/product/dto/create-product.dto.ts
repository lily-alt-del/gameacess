import { ProductCategory } from '@prisma/client';

import {
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  imageUrl: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;
}
