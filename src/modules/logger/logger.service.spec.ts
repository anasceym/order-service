import { Test, TestingModule } from '@nestjs/testing'
import * as bunyan from 'bunyan'

import { configProvider } from '../config/config.provider'
import { LOGGER, loggerProvider } from './logger.service'

describe('Logger', () => {
  let provider: bunyan

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [loggerProvider, configProvider],
    }).compile()

    provider = module.get<bunyan>(LOGGER)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })

  it('able to log', () => {
    provider.info('Hello World')
  })
})
