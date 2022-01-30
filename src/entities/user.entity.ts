import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class User implements InMemoryDBEntity {
  id: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  Username: string;
  Password: string;
  Email: string;
}
