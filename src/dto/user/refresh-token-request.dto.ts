import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDTO
  implements Readonly<RefreshTokenRequestDTO> {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string;
}
