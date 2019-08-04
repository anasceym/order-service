import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Order, OrderStatus } from './entity/order.entity'

@Injectable()
export class OrderService {
  constructor (
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll (): Promise<Order[]> {
    return this.orderRepository.find()
  }

  async cancelById (id: string): Promise<Order> {
    const order = await this.orderRepository.findOne(id)

    if (!order) {
      return null
    }

    order.status = OrderStatus.CANCELLED

    return this.orderRepository.save(order)
  }

  async getById (id: string): Promise<Order> {
    return this.orderRepository.findOne(id)
  }

  async create (name: string): Promise<Order> {
    const newOrder = new Order()
    newOrder.name = name

    return this.orderRepository.save(newOrder)
  }
}
