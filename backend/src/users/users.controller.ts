import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.service.update(Number(id), body);
  }
}