import { Provider } from '@nestjs/common'
import { join } from 'path'
import { createConnection } from 'typeorm'

import { CONFIG } from '../config/config.provider'
import { Config } from '../config/interface/config.interface'

export const MONGO_DB = 'DatabaseProviderToken'

export const databaseProvider: Provider  = {
    provide: MONGO_DB,
    useFactory: async (config: Config) => {
      return createConnection({
        type: 'mongodb',
        host: config.mongo.host,
        port: config.mongo.port,
        database: config.mongo.db,
        entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
        synchronize: true,
      })
    },
    inject: [CONFIG]
  }
