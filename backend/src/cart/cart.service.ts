import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getCart(userId: number) {
    let cart =
      await this.prisma.cart.findUnique({
        where: { userId },

        include: {
          items: {
            include: {
              mod: true,
            },
          },
        },
      });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },

        include: {
          items: {
            include: {
              mod: true,
            },
          },
        },
      });
    }

    return cart;
  }

  async addItem(
    userId: number,
    modId: number,
  ) {
    const cart = await this.getCart(userId);

    const existingItem =
      await this.prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          modId,
        },
      });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },

        data: {
          quantity:
            existingItem.quantity + 1,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        modId,
        quantity: 1,
      },
    });
  }

  async updateQuantity(
    itemId: number,
    quantity: number,
  ) {
    if (quantity <= 0) {
      throw new NotFoundException(
        'Quantidade inválida',
      );
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },

      data: {
        quantity,
      },
    });
  }

  removeItem(itemId: number) {
    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }
}