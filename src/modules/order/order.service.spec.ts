import { Test, TestingModule } from '@nestjs/testing'

import { OrderService } from './order.service'

xdescribe('AppController', () => {
  let orderService: OrderService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile()

    orderService = app.get<OrderService>(OrderService)
  })

  describe('List all orders created', () => {
    it('resolves list of all orders', async () => {
      const result = await orderService.findAll()

      expect(result.length).toBe(1)
    })
  })
})
