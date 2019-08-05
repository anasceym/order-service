import { Provider } from '@nestjs/common'
import * as bunyan from 'bunyan'

import { CONFIG } from '../config/config.provider'
import { Config } from '../config/interface/config.interface'

export const LOGGER = 'LoggerProviderToken'
export const loggerProvider: Provider = {
  provide: LOGGER,
  useFactory: (config: Config): any => provideLogger(config),
  inject: [CONFIG],
}

const provideLogger = (config: Config): bunyan => {
  const log = bunyan.createLogger({
    name: 'order-service',
  })

  return log
}
