import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DatabaseModule } from '../database/database.module'
import { Order, OrderStatus } from './entity/order.entity'
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

  describe('Cancel an order by id', () => {
    it('resolves the order with updated status, CANCELLED', async () => {
      // Prepare
      const newOrder = new Order()
      newOrder.name = 'New Order 2'
      const createdOrder = await orderRepo.save(newOrder)

      // Action
      const result = await orderService.cancelById(createdOrder.id.toString())

      // Assert
      expect(result.status).toBe(OrderStatus.CANCELLED)
    })
  })

  describe('Get an order by id', () => {
    it('resolves the order', async () => {
      // Prepare
      const newOrder = new Order()
      newOrder.name = 'New Order'
      const createdOrder = await orderRepo.save(newOrder)

      // Action
      const result = await orderService.getById(createdOrder.id.toString())

      // Assert
      expect(result.id.toString()).toEqual(createdOrder.id.toString())
    })
  })
})
