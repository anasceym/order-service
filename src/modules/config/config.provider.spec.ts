import { Test, TestingModule } from '@nestjs/testing'

import { CONFIG, configProvider } from './config.provider'
import { Config } from './interface/config.interface'

describe('Config', () => {
  let provider: Config

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [configProvider],
    }).compile()

    provider = module.get<Config>(CONFIG)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()

    expect(provider.app.host).toBe('localhost')
    expect(provider.app.port).toBe(2700)
  })
})
