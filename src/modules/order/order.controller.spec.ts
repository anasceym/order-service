import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DatabaseModule } from '../database/database.module'
import { Order } from './entity/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

xdescribe('OrderController', () => {
  let orderController: OrderController
  let orderRepo: Repository<Order>

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([Order])],
      controllers: [OrderController],
      providers: [OrderService],
    }).compile()

    orderController = app.get<OrderController>(OrderController)
    orderRepo = app.get('OrderRepository')

    // Truncate the order collection
    await orderRepo.clear()
  })

  describe('findAll()', () => {
    it('resolves the list of orders', async () => {
      // Prepare
      const newOrder = new Order()
      newOrder.name = 'New Order 1'
      await orderRepo.save(newOrder)

      // Action
      const result = await orderController.getAll()

      // Assert
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBeGreaterThan(0)
    })
  })
})
