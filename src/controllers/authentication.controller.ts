import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TokensService, UserService } from '../services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../dto';
import { Hash } from '../common/hash';
import { APIPayload } from '../interface';
import { RefreshTokenRequestDTO } from '../dto';
import { JwtAuthGuard } from '../common/jwt.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {}

  @Post('/login')
  public async login(@Body() body: LoginDTO) {
    const { username, password } = body;

    const user = await this.userService.getAuthUser(username);
    const valid = user ? await Hash.validateCredentials(user, password) : false;
    if (!valid) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Username or Password is incorrect!',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const access_token = await this.tokensService.generateAccessToken(user);

    delete user.password;
    const payload = {
      user: user,
      payload: {
        type: 'bearer',
        token: access_token,
      },
    };

    const apiPayload: APIPayload = {
      message: 'The User has been authenticated successfully.',
      payload,
    };
    return apiPayload;
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  public async getUser(@Req() request) {
    const userId = request.user.id;

    const user = await this.userService.get(userId);
    delete user.password;
    const apiPayload: APIPayload = {
      message: 'Who I Am.',
      payload: user,
    };
    return apiPayload;
  }
}
