import { components } from '@nestcloud/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// API controllers
import * as controllers from './controllers';

// API Services
import * as services from './services';

@Module({
  imports: [ConfigModule.forRoot(), InMemoryDBModule.forRoot()],
  controllers: components(controllers),
  providers: components(services),
})
export class AppModule {}
