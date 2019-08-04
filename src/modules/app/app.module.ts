import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { OrderModule } from '../order/order.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [DatabaseModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
