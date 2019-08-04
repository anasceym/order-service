import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger'

import { GetOrderResponseDto } from './dto/order.dto'
import { OrderStatus } from './entity/order.entity'
import { OrderService } from './order.service'

export enum ORDER_STATUS {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  status: ORDER_STATUS
}

@Controller('orders')
@ApiUseTags('orders')
export class OrderController {
  constructor (private readonly orderService: OrderService) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [GetOrderResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll (): Promise<GetOrderResponseDto[]> {
    const orders = await this.orderService.findAll()

    return orders.map(order => ({
      id: order.id.toString(),
      name: order.name,
      status: OrderStatus.CREATED,
    }))
  }
}
