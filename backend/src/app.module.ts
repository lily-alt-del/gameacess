import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { MockUserMiddleware } from './common/middleware/mock-user.middleware';
import { AuthModule } from './auth/auth.module';
import { ModModule } from './mod/mod.module';
import { ProductsModule } from './product/products.module';

@Module({
  imports: [PrismaModule, UsersModule, CartModule, OrderModule, AuthModule, ModModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MockUserMiddleware).forRoutes('*');
  }
}
