import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getEndpoint } from 'src/common/endpoint';
import { APIPayload } from 'src/interface';
import { AppService } from '../services';

@ApiTags('Profile')
@Controller(getEndpoint('profile'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<APIPayload> {
    const payload = await this.appService.getHello();
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // const apiPayload: APIPayload = {
    //   message: 'The app has been found.',
    //   payload,
    // };
    // return apiPayload;
  }
}
