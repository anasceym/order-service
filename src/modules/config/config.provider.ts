import { Provider } from '@nestjs/common'
import * as config from 'config'

export const CONFIG = 'ConfigProviderToken'

export const configProvider: Provider = {
  provide: CONFIG,
  useValue: config,
}
