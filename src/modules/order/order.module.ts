import { HttpModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from 'nest-schedule'

import { ConfigModule } from '../config/config.module'
import { Order } from './entity/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Order]),
    ScheduleModule.register(),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
