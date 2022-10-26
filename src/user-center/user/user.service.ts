import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './provider/user.mysql.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  profile(userId) {
    return this.userRepository.findOneBy(userId);
  }

  async findUserList() {
    const result = await this.userRepository.findAndCount();
    return {
      list: result[0],
      count: result[1],
    };
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    return this.userRepository.delete({
      id: userId,
    });
  }
}
