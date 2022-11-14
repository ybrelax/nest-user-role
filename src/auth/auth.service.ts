import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user-center/user/providers/user.entity';
import { UserService } from 'src/user-center/user/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  login(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      password: user.password,
      username: user.username,
    });
    return { token };
  }
}
