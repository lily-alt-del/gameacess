import { Controller, Get, Post, Body } from '@nestjs/common';
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
    return this.service.login(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}