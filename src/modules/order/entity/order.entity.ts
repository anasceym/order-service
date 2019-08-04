import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

export enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string;

  @Column({
    default: OrderStatus.CREATED
  })
  status: OrderStatus
}
