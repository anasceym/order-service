import { ApiModelProperty } from '@nestjs/swagger'

import { OrderStatus } from '../entity/order.entity'

export class GetOrderResponseDto {
  @ApiModelProperty({
    description: 'ID of order',
    example: 'id-1234',
  })
  id: string

  @ApiModelProperty({
    description: 'Name of the order',
    example: 'Name',
  })
  name: string

  @ApiModelProperty({
    description: 'Status of the order',
    enum: OrderStatus,
  })
  status: OrderStatus
}

export class CreateOrderRequestDto {
  @ApiModelProperty({
    description: 'Name of the order',
    example: 'Name',
  })
  name: string
}
