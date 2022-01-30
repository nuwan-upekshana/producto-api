import { UserDTO } from '../dto';

export class Hash {
  public static saltRounds = 10;

  public static async genarateHash(password: string) {
    //let salt = await genSalt(Hash.saltRounds);
    //return hash(password, salt);
    return password;
  }

  public static async validateCredentials(
    user: UserDTO,
    password: string,
  ): Promise<boolean> {
    // return compare(password, user.password);
    return true;
  }
}
