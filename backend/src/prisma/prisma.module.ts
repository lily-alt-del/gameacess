import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 ESSENCIAL para tornar o módulo global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 ESSENCIAL
})
export class PrismaModule {}