import { Injectable } from '@nestjs/common';
import { UserDTO } from '../dto';
import { SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

const BASE_OPTIONS: SignOptions = {
  issuer: 'https://my-app.com',
  audience: 'https://my-app.com',
};

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  public async generateAccessToken(user: UserDTO): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
    };
    return this.jwtService.signAsync({}, opts);
  }
}
