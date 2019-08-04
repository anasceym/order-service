import { Test, TestingModule } from '@nestjs/testing'

import { configProvider } from '../config/config.provider'
import { databaseProvider, MONGO_DB } from './database.provider'

describe.only('Database', () => {
  let provider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [databaseProvider, configProvider],
    }).compile();

    provider = module.get(MONGO_DB);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
