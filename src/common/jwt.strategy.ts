import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../services';
import { AccessTokenPayload } from '../interface';
import { UserDTO } from '../dto';
import { JWT } from '../constants/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT.key,
      signOptions: {
        expiresIn: JWT.expire,
      },
    });
  }

  async validate(payload: AccessTokenPayload): Promise<UserDTO> {
    const { sub: id } = payload;
    const user = await this.userService.get(id);
    if (!user) {
      return null;
    }
    return user;
  }
}
