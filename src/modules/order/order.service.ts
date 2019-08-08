import { HttpService, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InjectSchedule, Schedule } from 'nest-schedule'
import { Repository } from 'typeorm'

import { CONFIG } from '../config/config.provider'
import { Config } from '../config/interface/config.interface'
import { MakePaymentResponseDto, PaymentStatus } from './dto/payment.dto'
import { Order, OrderStatus } from './entity/order.entity'

@Injectable()
export class OrderService {
  constructor (
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(HttpService) private readonly httpService: HttpService,
    @Inject(CONFIG) private readonly config: Config,
    @InjectSchedule() private readonly schedule: Schedule,
  ) {}

  async findAll (): Promise<Order[]> {
    return this.orderRepository.find({
      order: {
        id: 'DESC'
      }
    })
  }

  async cancelById (id: string): Promise<Order> {
    const order = await this.orderRepository.findOne(id)

    if (!order) {
      return null
    }

    order.status = OrderStatus.CANCELLED

    this.schedule.cancelJob(this.getDeliverJobId(order))
    this.schedule.cancelJob(this.getPaymentJobId(order))

    return this.orderRepository.save(order)
  }

  async getById (id: string): Promise<Order> {
    return this.orderRepository.findOne(id)
  }

  async create (name: string): Promise<Order> {
    let newOrder = new Order()
    newOrder.name = name

    newOrder = await this.orderRepository.save(newOrder)

    this.handleMakePaymentJob(newOrder)

    return newOrder
  }

  private getPaymentJobId(order: Order) {
    return `make-payment-job-${order.id.toString()}`
  }

  private handleMakePaymentJob (newOrder: Order) {
    this.schedule.scheduleTimeoutJob(
      this.getPaymentJobId(newOrder),
      10000,
      () => {
        this.httpService
          .post(
            `http://${this.config.services.payment.host}:${
              this.config.services.payment.port
            }/payments/make`,
            {
              referenceId: newOrder.id.toString(),
            },
          )
          .subscribe(async ({ data }: { data: MakePaymentResponseDto }) => {
            switch (data.status) {
              case PaymentStatus.CONFIRMED:
                newOrder.status = OrderStatus.CONFIRMED
                this.handleDeliverJob(newOrder)
                break
              default:
                newOrder.status = OrderStatus.CANCELLED
            }
            await this.orderRepository.save(newOrder)
          })
        return true
      },
    )
  }

  private handleDeliverJob (order: Order) {
    this.schedule.scheduleTimeoutJob(
      this.getDeliverJobId(order),
      20000,
      async () => {
        order.status = OrderStatus.DELIVERED
        await this.orderRepository.save(order)
        return true
      },
    )
  }

  private getDeliverJobId(order: Order): string {
    return `deliver-job-${order.id.toString()}`;
  }
}
