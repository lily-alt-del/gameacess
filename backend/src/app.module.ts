import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MockUserMiddleware } from './common/middleware/mock-user.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, CartModule, ProductModule, OrderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MockUserMiddleware).forRoutes('*');
  }
}
