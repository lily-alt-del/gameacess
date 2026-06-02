import { Module } from '@nestjs/common';

import { ModController } from './mod.controller';
import { ModService } from './mod.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ModController],
  providers: [ModService],
})
export class ModModule {}