import { Body, Controller, Post, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createProduct() {
    return {
      message:
        'Produto criado com sucesso',
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return {
      message: 'Você está autenticado',
    };
  }
}
