import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserDTO } from '../dto';
import { Hash } from '../common/hash';
import { RefreshTokenPayload } from '../interface';
import { UserUpdateDTO } from '../dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { User } from '../entities';
import { lastValueFrom } from 'rxjs';
import { getUUID } from 'src/common/uuid';

@Injectable()
export class UserService {
  constructor(private userRepo: InMemoryDBService<User>) {}

  /**
   * Get a product using id form the InMemory DB
   * @param {string} id
   * @returns {Promise} ProductDTO
   */
  async get(id: string): Promise<UserDTO> {
    return await lastValueFrom(this.userRepo.getAsync(id)).then((data) =>
      UserDTO.fromEntity(data),
    );
  }

  async getAuthUser(username: string): Promise<UserDTO> {
    const users = await this.userRepo.query((us) => us.Username == username);
    if (users.length > 0) {
      return UserDTO.fromEntity(users[0]);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  public async create(dto: UserDTO): Promise<UserDTO> {
    // Convert DTO to entity
    const entity = dto.toEntity();
    //get document id
    entity.id = getUUID();
    return await lastValueFrom(this.userRepo.createAsync(entity)).then((e) =>
      UserDTO.fromEntity(e),
    );
  }

  /**
   * Seed product in the InMemory DB
   * @returns {Promise} boolean
   */
  public async seed(): Promise<{ seed: boolean }> {
    // Create seed admin
    const entity = new User();
    entity.Username = 'admin@producto.com';
    entity.Password = await Hash.genarateHash('asd@123');
    //get document id
    entity.id = getUUID();
    entity.FirstName = 'Nuwan';
    entity.LastName = 'Upekshana';
    entity.DisplayName = 'Nuwan';
    entity.Email = 'nuwan.upekshana@producto.com';
    await lastValueFrom(this.userRepo.createAsync(entity)).then((e) =>
      UserDTO.fromEntity(e),
    );
    return { seed: true };
  }
}
