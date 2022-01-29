import { components } from '@nestcloud/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as controllers from './controllers';
import * as services from './services';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: components(controllers),
  providers: components(services),
})
export class AppModule {}
