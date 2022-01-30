import { components } from '@nestcloud/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/jwt.strategy';
import { JWT } from './constants/jwt';

// API controllers
import * as controllers from './controllers';

// API Services
import * as services from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InMemoryDBModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: JWT.key,
      signOptions: { expiresIn: JWT.expire },
    }),
  ],
  controllers: components(controllers),
  providers: components(services, JwtStrategy),
})
export class AppModule {}
