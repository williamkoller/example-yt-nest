import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class Bcrypt {
  public async hash(plaintext: string): Promise<string> {
    return hashSync(plaintext, genSaltSync());
  }

  public async compare(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest);
  }
}
