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
      useFactory: (config: Config) => {
        const url =
          config.mongo.username &&
          config.mongo.password &&
          config.mongo.db &&
          config.mongo.host
            ? 'mongodb+srv://{{username}}:{{password}}@{{host}}/{{db}}?retryWrites=true&w=majority'
                .replace('{{username}}', config.mongo.username)
                .replace('{{password}}', config.mongo.password)
                .replace('{{host}}', config.mongo.host)
                .replace('{{db}}', config.mongo.db)
            : ''

        return {
          type: 'mongodb',
          url,
          useNewUrlParser: true,
          host: config.mongo.host,
          port: config.mongo.port,
          database: config.mongo.db,
          entities: [join(__dirname, '../**/entity/**.entity{.ts,.js}')],
          synchronize: true,
          keepConnectionAlive: true,
        }
      },
      inject: [CONFIG],
    }),
  ],
})
export class DatabaseModule {}
