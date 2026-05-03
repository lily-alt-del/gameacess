import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: number) {
    // 1. pegar carrinho com produtos
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Carrinho vazio');
    }

    // 2. calcular total
    let total = 0;

    const itemsData = cart.items.map((item) => {
      const itemTotal = item.quantity * item.product.price;
      total += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // 3. criar pedido
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: itemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // 4. limpar carrinho
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
