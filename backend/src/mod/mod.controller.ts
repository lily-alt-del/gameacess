import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ModService } from './mod.service';

import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('mods')
export class ModController {
  constructor(
    private readonly modService: ModService,
  ) {}

  @Get()
  findAll() {
    return this.modService.findAll();
  }

  @Get('category/:category')
  findByCategory(
    @Param('category') category: string,
  ) {
    return this.modService.findByCategory(
      category,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modService.findOne(
      Number(id),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(
    @Body() body: CreateModDto,
  ) {
    return this.modService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() body: UpdateModDto,
  ) {
    return this.modService.update(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.modService.remove(
      Number(id),
    );
  }
}