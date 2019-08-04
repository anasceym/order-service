import { Controller, Get } from '@nestjs/common'

import { GetOrderResponseDto } from './dto/order.dto'
import { OrderStatus } from './entity/order.entity'
import { OrderService } from './order.service'

export enum ORDER_STATUS {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
   status: ORDER_STATUS
}

@Controller('orders')
export class OrderController {
  constructor (
    private readonly orderService: OrderService
  ) {}
  @Get()
  async getAll (): Promise<GetOrderResponseDto[]> {
    const orders = await this.orderService.findAll()

    return orders.map(order => ({
      id: order.id.toString(),
      name: order.name,
      status: OrderStatus.CREATED
    }))
  }
}
