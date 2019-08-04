import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './modules/app/app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  
  const options = new DocumentBuilder()
    .setTitle('Order Service')
    .setDescription('The order-service API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  
  await app.listen(3000)
}

// tslint:disable-next-line: no-floating-promises
bootstrap()
