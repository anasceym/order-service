import { OrderStatus } from '../entity/order.entity'

export class GetOrderResponseDto {
  id: string
  name: string
  status: OrderStatus
}
