import { HttpModule, HttpService, Inject, Module } from '@nestjs/common'
import * as bunyan from 'bunyan'

import { ConfigModule } from '../config/config.module'
import { CONFIG } from '../config/config.provider'
import { Config } from '../config/interface/config.interface'
import { DatabaseModule } from '../database/database.module'
import { LOGGER, loggerProvider } from '../logger/logger.service'
import { OrderModule } from '../order/order.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [DatabaseModule, OrderModule, HttpModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, loggerProvider],
})
export class AppModule {
  constructor (
    private readonly httpService: HttpService,
    @Inject(CONFIG) private config: Config,
    @Inject(LOGGER) private logger: bunyan,
  ) {
    httpService
      .get(
        `http://${this.config.services.payment.host}:${
          this.config.services.payment.port
        }/health`,
      )
      .subscribe(
        res => {
          this.logger.info({ ...res.data }, 'Successfully ping payment-service')
        },
        error => {
          this.logger.error(error, 'Unable to ping payment-service')
        },
      )
  }
}
