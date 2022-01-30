import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO implements Readonly<LoginDTO> {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;
}
