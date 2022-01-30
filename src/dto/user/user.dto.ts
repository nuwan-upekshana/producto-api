import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { User } from '../../entities';
import { Match } from '../../common/decorator/match.decorator';

export class UserDTO implements Readonly<UserDTO> {
  id: string;

  doc_id: string;

  doc_no: number;

  @ApiProperty({ required: false })
  code: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ required: false })
  display_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Match(UserDTO, (s) => s.password, {
    message: 'Confirm password need to match with the password',
  })
  confirm_password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be an valid email' })
  email: string;

  public static from(dto: Partial<UserDTO>) {
    let object = new UserDTO();
    object = <UserDTO>dto;
    return object;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      first_name: entity.FirstName,
      last_name: entity.LastName,
      display_name: entity.DisplayName,
      email: entity.Email,
      username: entity.Username,
      password: entity.Password,
    });
  }

  public toEntity() {
    const entity = new User();
    entity.FirstName = this.first_name;
    entity.LastName = this.last_name;
    entity.DisplayName = this.display_name;
    entity.Email = this.email;
    entity.Username = this.username;
    entity.Password = this.password;
    return entity;
  }
}
