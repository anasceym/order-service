import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import * as request from 'supertest'

import { OrderModule } from '../src/modules/order/order.module'

describe('OrderController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrderModule, TypeOrmModule.forRoot({
        type: 'mongodb',
        host: 'localhost',
        database: 'order-db',
        entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
        synchronize: true,
      })],
    }).compile()

    app = moduleFixture.createNestApplication();
    await app.init()
  });

  it('/orders (GET)', async () => {
    await request(app.getHttpServer())
      .get('/orders')
      .expect(200)
  });
});
