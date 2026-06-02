import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';

@Injectable()
export class ModService {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateModDto) {
    return this.prisma.mod.create({
      data,
    });
  }

  findAll() {
    return this.prisma.mod.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.mod.findUnique({
      where: { id },
    });
  }

  findByCategory(category: string) {
    return this.prisma.mod.findMany({
      where: {
        category: category as any,
      },
    });
  }

  update(
    id: number,
    data: UpdateModDto,
  ) {
    return this.prisma.mod.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.mod.delete({
      where: { id },
    });
  }
}