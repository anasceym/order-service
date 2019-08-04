import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DatabaseModule } from '../database/database.module'
import { Order } from './entity/order.entity'
import { OrderService } from './order.service'

describe('OrderService', () => {
  let orderService: OrderService
  let orderRepo: Repository<Order>

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([Order])],
      providers: [OrderService],
    }).compile()

    orderService = app.get<OrderService>(OrderService)
    orderRepo = app.get('OrderRepository')

    // Truncate the order collection
    await orderRepo.clear()
  })

  describe('List all orders created', () => {
    it('resolves list of all orders', async () => {
      const newOrder = new Order()
      newOrder.name = 'New Order 2'
      await orderRepo.save(newOrder)

      const result = await orderService.findAll()

      expect(result.length).toBe(1)
    })
  })
})
