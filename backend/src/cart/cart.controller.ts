import { Controller, Get, Post, Body, Query, Delete, Param, Req } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req: Request) {
    return this.cartService.getCart(req['userId']);
  }

  @Post('add')
addItem(@Req() req: Request, @Body() body: any) {
  return this.cartService.addItem(
    req['userId'],
    body.productId,
    body.quantity,
  );
}

  @Delete(':itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.cartService.removeItem(Number(itemId));
  }
}