import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }
}