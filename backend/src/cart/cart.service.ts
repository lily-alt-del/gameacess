import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // 👈 ESSENCIAL
          },
        },
      },
    });

    if (!cart) return null;

    // 🧮 calcular total
    let total = 0;

    const items = cart.items.map((item) => {
      const itemTotal = item.quantity * item.product.price;
      total += itemTotal;

      return {
        id: item.id,
        product: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        total: itemTotal,
      };
    });

    return {
      id: cart.id,
      items,
      total,
    };
  }

  async addItem(userId: number, productId: number, quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantidade inválida');
    }

    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // 🔎 verifica se o item já existe
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    // 🔁 se existir, atualiza quantidade
    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    }

    // ➕ se não existir, cria novo
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  async removeItem(itemId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new Error('Item não encontrado');
    }

    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async updateQuantity(itemId: number, quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantidade inválida');
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }
}
