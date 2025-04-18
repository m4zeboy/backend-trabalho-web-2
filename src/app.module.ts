import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule } from '@core/core.module'
import { MealModule } from './meal/meal.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './auth/users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { OrdersModule } from './orders/orders.module'
import { FoodsModule } from './meal/foods/foods.module'
import { FeedbackModule } from './feedback/feedback.module'
import { PaymentModule } from './payment/payment.module'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/banco.db',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    FoodsModule,
    MealModule,
    AuthModule,
    OrdersModule,
    FeedbackModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
