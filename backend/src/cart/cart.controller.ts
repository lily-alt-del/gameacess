import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CartService } from './cart.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Get()
  getCart(@Req() req: any) {
    return this.cartService.getCart(
      req.user.id,
    );
  }

  @Post(':modId')
  addItem(
    @Req() req: any,
    @Param('modId') modId: string,
  ) {
    return this.cartService.addItem(
      req.user.id,
      Number(modId),
    );
  }

  @Put(':itemId')
  updateQuantity(
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateQuantity(
      Number(itemId),
      body.quantity,
    );
  }

  @Delete(':itemId')
  removeItem(
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(
      Number(itemId),
    );
  }
}