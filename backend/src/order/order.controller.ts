import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Body,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from '@prisma/client';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  checkout(@Req() req: Request) {
    return this.orderService.checkout(req['userId']);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(Number(id));
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto
  ) {
    return this.orderService.updateStatus(Number(id), body.status);
  }
}