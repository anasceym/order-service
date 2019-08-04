import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConfigModule } from '../config/config.module'
import { DatabaseModule } from '../database/database.module'
import { Order, OrderStatus } from './entity/order.entity'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

describe('OrderController', () => {
  let orderController: OrderController
  let orderRepo: Repository<Order>

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        DatabaseModule,
        TypeOrmModule.forFeature([Order]),
      ],
      controllers: [OrderController],
      providers: [OrderService],
    }).compile()

    orderController = app.get<OrderController>(OrderController)
    orderRepo = app.get('OrderRepository')
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

  describe('Cancel order', () => {
    it('resolves the order with updated status', async () => {
      // Prepare
      const newOrder = new Order()
      newOrder.name = 'New Order'
      const createdOrder = await orderRepo.save(newOrder)

      // Action
      const result = await orderController.cancelById(
        createdOrder.id.toString(),
      )

      // Assert
      expect(result.status).toBe(OrderStatus.CANCELLED)
    })

    describe('Unknown order id', () => {
      it('throws not found exception', async () => {
        // Prepare
        const unknownId = '5d470a0e1d7a41762ad03bd5'
        // Action
        try {
          await orderController.cancelById(unknownId)
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException)
        }
      })
    })
  })

  describe('Get order by ID', () => {
    it('resolves the order', async () => {
      // Prepare
      const newOrder = new Order()
      newOrder.name = 'New Order'
      const createdOrder = await orderRepo.save(newOrder)

      // Action
      const result = await orderController.cancelById(
        createdOrder.id.toString(),
      )

      // Assert
      expect(result.id).toBe(createdOrder.id.toString())
    })

    describe('unknown id', () => {
      it('throws not found exception', async () => {
        // Prepare
        const unknownId = '5d470a0e1d7a41762ad03bd5'
        // Action
        try {
          await orderController.findById(unknownId)
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException)
        }
      })
    })

    describe('Creating a new order', () => {
      it('resolves the newly created order', async () => {
        // Prepare
        const body = {
          name: 'Newly created order',
        }

        // Action
        const result = await orderController.create(body)

        // Assert
        expect(result.name).toBe(body.name)
      })
    })
  })
})
