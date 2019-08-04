import { Controller, Get } from '@nestjs/common'

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
  create (): Order {
    return {
      status: ORDER_STATUS.CREATED
    }
  }

  @Get()
  get (): Order[] {
    return [
      {
        status: ORDER_STATUS.CREATED
      }
    ]
  }

  cancel (): void {
    return
  }
}
