import { Controller, Get, Post, Body, Put, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    console.log('LOGIN FOI CHAMADO');
    return this.service.login(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.service.update(Number(id), body);
  }
}