import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // 🔎 verifica se email já existe
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        avatar: data.avatar || null, // 👈 NOVO
      },
    });

    // ❌ remove senha do retorno
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(data: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 🔥 garantir carrinho
    let cart = await this.prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId: user.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    // ❌ remove senha
    const { password, ...userWithoutPassword } = user;

    return {
      message: 'Login realizado com sucesso',
      user: userWithoutPassword, // 👈 agora inclui avatar automaticamente
      cart,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    // remove senha de todos
    return users.map(({ password, ...rest }) => rest);
  }
}