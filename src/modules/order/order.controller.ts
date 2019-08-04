import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common'
import {
  ApiImplicitParam,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger'

import { GetOrderResponseDto } from './dto/order.dto'
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
      status: order.status,
    }))
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiImplicitParam({
    name: 'id',
    required: true,
    description: 'Order ID',
  })
  @ApiOkResponse({ type: GetOrderResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async cancelById (@Param('id') id): Promise<GetOrderResponseDto> {
    const result = await this.orderService.cancelById(id)

    return {
      id: result.id.toString(),
      name: result.name,
      status: result.status,
    }
  }
}
