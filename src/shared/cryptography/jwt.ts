import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VerifyTokenType } from 'src/auth/types/verify-token/verify-token.type';
import { User } from 'src/users/schemas/user.schema';

type JwtPayloadType = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

@Injectable()
export class Jwt {
  constructor(private readonly jwtService: JwtService) {}

  public async encrypt(user: User): Promise<string> {
    const jwtPayload: JwtPayloadType = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return this.jwtService.signAsync(jwtPayload);
  }

  public async decrypt(token: string): Promise<VerifyTokenType> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
