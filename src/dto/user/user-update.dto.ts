import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { User } from '../../entities';

export class UserUpdateDTO implements Readonly<UserUpdateDTO> {
  @ApiProperty({ required: false })
  id: string;
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
  @IsEmail({}, { message: 'Email must be an valid email' })
  email: string;

  public static from(dto: Partial<UserUpdateDTO>) {
    let object = new UserUpdateDTO();
    object = <UserUpdateDTO>dto;
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
    });
  }

  public toEntity() {
    const entity = new User();
    entity.FirstName = this.first_name;
    entity.LastName = this.last_name;
    entity.DisplayName = this.display_name;
    entity.Email = this.email;
    return entity;
  }
}
