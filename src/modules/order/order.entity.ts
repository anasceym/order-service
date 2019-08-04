import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string;
}
