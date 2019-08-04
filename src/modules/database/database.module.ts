import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { ConfigModule } from '../config/config.module'
import { CONFIG } from '../config/config.provider'
import { Config } from '../config/interface/config.interface'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: Config) => ({
        type: 'mongodb',
        host: config.mongo.host,
        port: config.mongo.port,
        database: config.mongo.db,
        entities: [join(__dirname, '../**/entity/**.entity{.ts,.js}')],
        synchronize: true,
        keepConnectionAlive: true,
      }),
      inject: [CONFIG],
    }),
  ],
})
export class DatabaseModule {}
