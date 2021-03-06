import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import {
  ApiImplicitParam,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger'

import { CreateOrderRequestDto, GetOrderResponseDto } from './dto/order.dto'
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
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async cancelById (@Param('id') id): Promise<GetOrderResponseDto> {
    const result = await this.orderService.cancelById(id)

    if (!result) {
      throw new NotFoundException()
    }

    return {
      id: result.id.toString(),
      name: result.name,
      status: result.status,
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiImplicitParam({
    name: 'id',
    required: true,
    description: 'Order ID',
  })
  @ApiOkResponse({ type: GetOrderResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async findById (@Param('id') id): Promise<GetOrderResponseDto> {
    const result = await this.orderService.getById(id)

    if (!result) {
      throw new NotFoundException()
    }

    return {
      id: result.id.toString(),
      name: result.name,
      status: result.status,
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GetOrderResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create (
    @Body() body: CreateOrderRequestDto,
  ): Promise<GetOrderResponseDto> {
    const result = await this.orderService.create(body.name)

    return {
      id: result.id.toString(),
      name: result.name,
      status: result.status,
    }
  }
}
